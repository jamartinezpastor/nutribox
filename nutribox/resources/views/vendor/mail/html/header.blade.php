@props(['url'])
<tr>
    <td class="header">
        <a href="{{ $url }}" style="display: inline-block;">
            @if (trim($slot) === 'Nutribox')
                <img src="{{ asset('img/nutribox1.png') }}"   width="150"
                height="150" class="logo" alt="NUTRIBOX: Alimentación Inteligente">
            @else
                {{ $slot }}
            @endif
        </a>
    </td>
</tr>
