<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title', 'Admin') | AZIZI JEWELLERY</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    @stack('styles')
</head>

<body class="min-h-screen bg-[#f7f5f0] text-[#242321] antialiased">

    <div class="flex min-h-screen">

        {{-- Sidebar --}}
        <aside class="hidden w-64 shrink-0 border-r border-[#ded8cc] bg-[#242321] text-white lg:flex lg:flex-col">

            <div class="border-b border-white/10 px-7 py-7">

                <div class="text-[11px] uppercase tracking-[0.32em] text-[#d8bd82]">
                    AZIZI
                </div>

                <div class="mt-1 text-sm tracking-[0.18em] text-white/80">
                    JEWELLERY
                </div>

                <div class="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Administration
                </div>

            </div>

            <nav class="flex-1 px-4 py-6">

                <p class="px-3 pb-3 text-[10px] uppercase tracking-[0.22em] text-white/30">
                    Workspace
                </p>

                <a
                    href="{{ route('admin.dashboard') }}"
                    class="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                    <span class="h-1.5 w-1.5 rounded-full bg-[#d8bd82]"></span>
                    Dashboard
                </a>

                <a
                    href="#"
                    class="mt-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                    <span class="h-1.5 w-1.5 rounded-full bg-white/20"></span>
                    Appointments
                </a>

                <a
    href="{{ route('admin.content.index') }}"
    class="..."
>
    Content
</a>
<a
    href="{{ route('admin.customers.index') }}"
    class="mt-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
>
    <span class="h-1.5 w-1.5 rounded-full bg-white/20"></span>
    Customers
</a>

            <a
    href="{{ route('admin.subscribers.index') }}"
    class="mt-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
>
    <span class="h-1.5 w-1.5 rounded-full bg-white/20"></span>
    Subscribers
</a>

              <a
    href="{{ route('admin.contacts.index') }}"
    class="mt-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
>
    <span class="h-1.5 w-1.5 rounded-full bg-white/20"></span>
    Contacts
</a>

                <div class="my-6 border-t border-white/10"></div>

                <p class="px-3 pb-3 text-[10px] uppercase tracking-[0.22em] text-white/30">
                    System
                </p>

                <a
    href="{{ route('admin.settings.index') }}"
    class="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
>
    <span class="h-1.5 w-1.5 rounded-full bg-white/20"></span>
    Settings
</a>

            </nav>

            <div class="border-t border-white/10 p-5">

                <div class="mb-4">
                    <p class="truncate text-sm text-white">
                        {{ auth()->user()->name }}
                    </p>

                    <p class="mt-1 truncate text-xs text-white/40">
                        {{ auth()->user()->email }}
                    </p>
                </div>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf

                    <button
                        type="submit"
                        class="w-full rounded-lg border border-white/10 px-3 py-2.5 text-left text-xs text-white/60 transition hover:border-white/20 hover:text-white"
                    >
                        Sign out
                    </button>
                </form>

            </div>

        </aside>

        {{-- Main --}}
        <div class="flex min-w-0 flex-1 flex-col">

            {{-- Top bar --}}
            <header class="sticky top-0 z-20 border-b border-[#ded8cc] bg-[#f7f5f0]/95 backdrop-blur">

                <div class="flex h-20 items-center justify-between px-5 sm:px-8">

                    <div>
                        <p class="text-[10px] uppercase tracking-[0.24em] text-[#a98d58]">
                            Admin
                        </p>

                        <h1 class="mt-1 text-lg font-medium tracking-tight">
                            @yield('page-heading', 'Dashboard')
                        </h1>
                    </div>

                    <div class="flex items-center gap-4">

                        <div class="hidden text-right sm:block">
                            <p class="text-sm font-medium">
                                {{ auth()->user()->name }}
                            </p>

                            <p class="text-xs text-[#77736b]">
                                Administrator
                            </p>
                        </div>

                        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#242321] text-sm text-[#d8bd82]">
                            {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
                        </div>

                    </div>

                </div>

            </header>

            {{-- Content --}}
            <main class="flex-1 px-5 py-8 sm:px-8 lg:px-10">

                @yield('content')

            </main>

        </div>

    </div>

    @stack('scripts')

</body>
</html>