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

    'gemini' => [
        'key' => env('GEMINI_API_KEY'),
        'base_url' => env('GEMINI_BASE_URL', 'https://generativelanguage.googleapis.com/v1beta'),
        'model_eval' => env('GEMINI_MODEL_EVAL', 'gemini-3.5-flash-lite'),
        'model_menu' => env('GEMINI_MODEL_MENU', 'gemini-3.5-flash-lite'),
        'thinking_level' => env('GEMINI_THINKING_LEVEL', 'LOW'),
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
