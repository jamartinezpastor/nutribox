import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nutribox.es/');
  await page.getByRole('link', { name: 'Registrarse' }).click();
  await page.getByRole('textbox', { name: 'Nombre y apellidos' }).click();
  await page.getByRole('textbox', { name: 'Nombre y apellidos' }).fill('test');
  await page.getByRole('textbox', { name: 'Nombre y apellidos' }).click();
  await page.getByRole('textbox', { name: 'Nombre y apellidos' }).fill('testplay');
  await page.getByRole('radio', { name: 'Hombre' }).click();
  await page.getByRole('spinbutton', { name: 'Edad' }).click();
  await page.getByRole('spinbutton', { name: 'Edad' }).fill('050');
  await page.getByRole('spinbutton', { name: 'Altura (cm)' }).click();
  await page.getByRole('spinbutton', { name: 'Altura (cm)' }).fill('0180');
  await page.getByRole('spinbutton', { name: 'Peso (kg)' }).click();
  await page.getByRole('spinbutton', { name: 'Peso (kg)' }).fill('077');
  await page.getByRole('combobox').click();
  await page.getByLabel('Nivel').getByText('Completamente sedentario').click();
  await page.getByRole('textbox', { name: '¿Padeces algún problema de' }).click();
  await page.getByRole('textbox', { name: '¿Padeces algún problema de' }).fill('Test para envio de mail desde register');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('testmail@prueba.es');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('12345678');
  await page.getByRole('textbox', { name: 'Confirma tu contraseña' }).click();
  await page.getByRole('textbox', { name: 'Confirma tu contraseña' }).fill('12345678');
  await page.getByRole('button', { name: 'Dar de alta' }).click();
});