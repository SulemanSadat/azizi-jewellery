<x-app-layout>
    <div class="min-h-screen bg-[#f7f5f0] text-[#242321]">
        <div class="mx-auto max-w-7xl px-6 py-10">

            <div class="mb-10">
                <p class="text-xs uppercase tracking-[0.25em] text-[#a98d58]">
                    Website
                </p>

                <h1 class="mt-3 text-4xl font-light tracking-tight">
                    Content
                </h1>

                <p class="mt-3 text-sm text-[#6f6b63]">
                    Manage the content displayed across the AZIZI JEWELLERY website.
                </p>
            </div>

            @if(session('success'))
                <div class="mb-6 border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
                    {{ session('success') }}
                </div>
            @endif

            <div class="overflow-hidden border border-[#ded8cc] bg-white">
                <div class="border-b border-[#ded8cc] px-6 py-5">
                    <h2 class="text-lg font-medium">
                        Homepage Content
                    </h2>
                </div>

                @forelse($content as $block)
                    <div class="flex flex-col gap-5 border-b border-[#eeeae2] px-6 py-6 last:border-b-0 md:flex-row md:items-center md:justify-between">

                        <div>
                            <div class="flex items-center gap-3">
                                <h3 class="text-lg font-medium">
                                    {{ $block->section }}
                                </h3>

                                @if($block->is_active)
                                    <span class="bg-green-50 px-2 py-1 text-xs text-green-700">
                                        Active
                                    </span>
                                @else
                                    <span class="bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                        Hidden
                                    </span>
                                @endif
                            </div>

                            @if($block->title)
                                <p class="mt-2 text-sm text-[#6f6b63]">
                                    {{ $block->title }}
                                </p>
                            @endif
                        </div>

                        <a
                            href="{{ route('admin.content.edit', $block) }}"
                            class="inline-flex w-fit border border-[#242321] px-5 py-3 text-sm transition hover:bg-[#242321] hover:text-white"
                        >
                            Edit
                        </a>

                    </div>
                @empty
                    <div class="px-6 py-12 text-center text-sm text-[#6f6b63]">
                        No homepage content has been created yet.
                    </div>
                @endforelse
            </div>

        </div>
    </div>
</x-app-layout>