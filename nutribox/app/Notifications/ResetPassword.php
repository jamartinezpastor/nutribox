<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPassword extends Notification
{
    public $token;
    public $email;

    public function __construct($token, $email = null)
    {
        $this->token = $token;
        $this->email = $email;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $url = url(config('app.url').route('password.reset', [
            'token' => $this->token,
            'email' => $this->email ?? $notifiable->getEmailForPasswordReset(),
        ], false));

        return (new MailMessage)
            ->subject('Restablece tu contraseña en Nutribox')
            ->greeting('¡Hola!')
            ->line('Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Nutribox.')
            ->action('Restablecer contraseña', $url)
            ->line('Este enlace para restablecer la contraseña caduca en 60 minutos.')
            ->line('Si no solicitaste el restablecimiento de tu contraseña, puedes ignorar este mensaje. Tu cuenta seguirá siendo segura.')
            ->salutation('Un saludo, El equipo de Nutribox');
    }
}
