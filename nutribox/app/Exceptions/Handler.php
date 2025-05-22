<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    public function render($request, Throwable $exception)
    {
        // SOLO para API o JSON
        if ($request->expectsJson() || $request->is('api/*')) {
            return parent::render($request, $exception);
        }

        // SOLO para 404
        if ($exception instanceof NotFoundHttpException) {
            return Inertia::render('Error', [
                'status' => 404,
                'mensaje' => 'Página no encontrada.',
            ])->toResponse($request)->setStatusCode(404);
        }

        // SOLO para errores HTTP (403, 500, etc.)
        if ($exception instanceof HttpExceptionInterface) {
            return Inertia::render('Error', [
                'status' => $exception->getStatusCode(),
                'mensaje' => $exception->getMessage() ?: 'Ha ocurrido un error inesperado.'
            ])->toResponse($request)
                ->setStatusCode($exception->getStatusCode());
        }

        // PARA TODO LO DEMÁS, RESPUESTA NORMAL
        return parent::render($request, $exception);
    }
}
