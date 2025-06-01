import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByRole('link', { name: 'Iniciar sesión' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('correo@ejemplo.es');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Contraseña');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await expect(page.getByRole('textbox', { name: 'Correo electrónico' })).toHaveValue('correo@ejemplo.es');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await expect(page.getByRole('textbox', { name: 'Contraseña' })).toHaveValue('Contraseña');
  await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toBeVisible();
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Menús guardados' }).click();
  await page.getByRole('link', { name: 'Buscar' }).click();
  await page.getByRole('link', { name: 'Evaluar' }).click();
  await page.getByRole('link', { name: 'Diseñar menú' }).click();
  await page.getByRole('link', { name: 'Canal Cocina' }).click();
  
  await page.goto('http://localhost:8000/settings/profile');
  await page.getByRole('link', { name: 'Contraseña' }).click();
  await page.getByRole('link', { name: 'Apariencia' }).click();
});