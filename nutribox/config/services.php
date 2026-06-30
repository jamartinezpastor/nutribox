<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'openrouter' => [
        'key' => env('OPENROUTER_API_KEY'),
        'base_url' => env('OPENROUTER_BASE_URL', 'https://openrouter.ai/api/v1'),
        'model_eval' => env('OPENROUTER_MODEL_EVAL', 'deepseek/deepseek-chat'),
        'model_menu' => env('OPENROUTER_MODEL_MENU', 'deepseek/deepseek-chat'),
    ],

    'pexels' => [
        'key' => env('PEXELS_API_KEY'),
    ],

    'app_name'    => env('APP_NAME'),
    'app_env'     => env('APP_ENV'),
    'app_url'     => env('APP_URL'),
    'mail_from'   => env('MAIL_FROM_ADDRESS'),
    'deployed_at' => env('DEPLOYED_AT'),

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

];
