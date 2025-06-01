<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Menu;
use App\Models\User;
use App\Models\Comida;
use App\Models\Producto;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class MenusControllerTest extends TestCase
{

    public function test_listar_returns_menus_for_authenticated_user()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        Menu::factory()->create(['user_id' => $user->id, 'fecha' => now()]);
        Menu::factory()->create(['user_id' => $user->id, 'fecha' => now()->subDay()]);
        Menu::factory()->create(); // Otro sin datos introducidos

        $response = $this->get(route('menus_listar'));

        $response->assertStatus(200);
        $menus_ids = Menu::where('user_id', $user->id)->orderBy('fecha', 'desc')->pluck('id')->toArray();
        foreach ($menus_ids as $id) {
            $response->assertSee((string)$id);
        }
    }

    public function test_verDetalles_returns_menu_details()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // Crear menú
        $menu = Menu::factory()->create(['user_id' => $user->id]);
        $comida = $menu->comidas()->create([
            'grupo' => 'Grupo 1',
            'info_extra' => 'Extra info'
        ]);
        // Crear producto asociado a la comida
        $comida->productos()->create([
            'nombre' => 'Producto 1',
            'cantidad' => 150,
            'unidad' => 'g',
            'kcal' => 100,
            'pr' => 5,
            'ch' => 10,
            'gr' => 2,
        ]);

        $response = $this->get('/menus/' . $menu->id);

   
       $response->assertStatus(200);
    }

    public function test_borrarMenuDiario_deletes_menu()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $menu = Menu::factory()->create(['user_id' => $user->id]);

        $response = $this->delete(route('borrarMenuDiario', ['id' => $menu->id]));

        $response->assertRedirect(route('menus_listar'));
        $this->assertDatabaseMissing('menus', ['id' => $menu->id]);
    }

    public function test_actualizarMenuDiario_updates_menu()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $menu = Menu::factory()->create(['user_id' => $user->id]);

        // Campos que requieren validación
        $response = $this->put(route('actualizarMenuDiario', ['id' => $menu->id]), [
            'nombre' => 'Updated Name',
            'info_extra' => 'Updated Info',
            'fecha' => now()->toDateString(),
            'tipo' => 'comida',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('menus', [
            'id' => $menu->id,
            'nombre' => 'Updated Name',
            'info_extra' => 'Updated Info',
        ]);
    }
}
