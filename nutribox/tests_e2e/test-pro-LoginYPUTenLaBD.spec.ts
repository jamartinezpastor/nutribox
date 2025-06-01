import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nutribox.es/login');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('correo@ejemplo.es');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Contraseña');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'UD' }).click();
  await page.getByRole('menuitem', { name: 'Opciones' }).click();
  await page.getByRole('spinbutton', { name: 'Edad' }).click();
  await page.getByRole('spinbutton', { name: 'Edad' }).fill('64');
  await page.getByRole('spinbutton', { name: 'Altura (cm)' }).click();
  await page.getByRole('spinbutton', { name: 'Altura (cm)' }).fill('174');
  await page.getByRole('spinbutton', { name: 'Peso (kg)' }).click();
  await page.getByRole('spinbutton', { name: 'Peso (kg)' }).fill('74');
  await page.getByRole('combobox').click();
  await page.getByLabel('Nivel').getByText('Completamente sedentario').click();
  await page.getByRole('textbox', { name: 'Nombre y apellidos' }).click();
  await page.getByRole('textbox', { name: 'Nombre y apellidos' }).fill('Usuario Test Demo');
  await page.getByRole('button', { name: 'Guardar cambios' }).click();
});