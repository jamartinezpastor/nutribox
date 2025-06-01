import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nutribox.es/');
  await page.getByRole('link', { name: 'Iniciar sesión' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('correo@ejemplo.es');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Contraseña');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Evaluar' }).click();
  await page.getByRole('textbox', { name: 'Alimento o producto:' }).click();
  await page.getByRole('textbox', { name: 'Alimento o producto:' }).fill('Huevos con jamón');
  await page.getByRole('spinbutton', { name: 'Cantidad:' }).click();
  await page.getByRole('spinbutton', { name: 'Cantidad:' }).fill('200');
  await page.getByRole('combobox').filter({ hasText: 'Selecciona una patología' }).click();
  await page.getByText('Sin patología conocida').click();
  await page.getByRole('button', { name: 'Evaluar' }).click();
  await page.goto('https://nutribox.es/dsevaluaracontroller?cantidad=200&patologia=Sin%20patolog%C3%ADa%20conocida&producto=Huevos%20con%20jam%C3%B3n&unidad=gr');
  await expect(page.getByRole('main')).toContainText('Huevos con jamón');
  await page.goto('https://nutribox.es/dsevaluaracontroller?cantidad=200&patologia=Sin%20patolog%C3%ADa%20conocida&producto=Huevos%20con%20jam%C3%B3n&unidad=gr');
  await page.getByRole('button', { name: '← Volver' }).click();
});