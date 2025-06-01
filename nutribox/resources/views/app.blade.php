<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <meta name="description"
        content="NutriBox te ofrece planes de alimentación saludable personalizados para mejorar tu bienestar.">
    <meta name="keywords" content="NutriBox, alimentación saludable, planes de comida, bienestar, nutrición">
    <meta name="author" content="NutriBox">

    {{-- Open Graph (OG) meta tags --}}
    <meta property="og:title" content="NutriBox - Alimentación Saludable">
    <meta property="og:description"
        content="NutriBox te ofrece planes de alimentación saludable personalizados para mejorar tu bienestar.">
    <meta property="og:image" content="{{ asset('img/nutribox.gif') }}">
    <meta property="og:url" content="https://nutribox.es">
    <meta property="og:type" content="website">

    {{-- Twitter meta tags --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="NutriBox - Alimentación Saludable">
    <meta name="twitter:description"
        content="NutriBox te ofrece planes de alimentación saludable personalizados para mejorar tu bienestar.">
    <meta name="twitter:image" content="{{ asset('img/nutribox.gif') }}">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead

    <!-- Google Tag Manager -->
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-PZHPZ5DC');
    </script>
    <!-- End Google Tag Manager -->
</head>

<body class="font-sans antialiased">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PZHPZ5DC" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    @inertia
</body>

</html>
