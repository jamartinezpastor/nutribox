<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
// use Throwable;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
      
        // .json
        $exceptions->render(function (Throwable $e, Request $request) {
            if ($request->expectsJson()) {
                // Devuelve null para ceder el render al Handler por defecto
                return null;
            }
        });

        // 404
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            return Inertia::render('Error', [
                'status'  => 404,
                'mensaje' => 'Página no encontrada.',
            ])
            ->toResponse($request)
            ->setStatusCode(404);
        });

        // 405
        $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
            return Inertia::render('Error', [
                'status'  => 405,
                'mensaje' => 'Método no permitido para esta ruta.',
            ])
            ->toResponse($request)
            ->setStatusCode(405);
        });

        // Resto de HttpException (403, 500, etc.)
        $exceptions->render(function (HttpExceptionInterface $e, Request $request) {
            return Inertia::render('Error', [
                'status'  => $e->getStatusCode(),
                'mensaje' => $e->getMessage() ?: 'Ha ocurrido un error inesperado.',
            ])
            ->toResponse($request)
            ->setStatusCode($e->getStatusCode());
        });
    
    })
    ->create();
