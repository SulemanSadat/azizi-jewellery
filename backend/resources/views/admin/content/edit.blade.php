<x-app-layout>
    <div class="min-h-screen bg-[#f7f5f0] text-[#242321]">
        <div class="mx-auto max-w-4xl px-6 py-10">

            <a
                href="{{ route('admin.content.index') }}"
                class="text-sm text-[#6f6b63] hover:text-[#242321]"
            >
                ← Back to Content
            </a>

            <div class="mb-10 mt-8">
                <p class="text-xs uppercase tracking-[0.25em] text-[#a98d58]">
                    Website Content
                </p>

                <h1 class="mt-3 text-4xl font-light">
                    {{ $content->section }}
                </h1>
            </div>

            @if($errors->any())
                <div class="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                    <ul class="list-disc space-y-1 pl-5">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form
                method="POST"
                action="{{ route('admin.content.update', $content) }}"
                class="space-y-8"
            >
                @csrf
                @method('PUT')

                <div class="border border-[#ded8cc] bg-white p-8">

                    <div class="space-y-6">

                        <div>
                            <label class="text-sm font-medium">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value="{{ old('title', $content->title) }}"
                                class="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                            >
                        </div>

                        <div>
                            <label class="text-sm font-medium">
                                Content
                            </label>

                            <textarea
                                name="content"
                                rows="7"
                                class="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                            >{{ old('content', $content->content) }}</textarea>
                        </div>

                        <div>
                            <label class="text-sm font-medium">
                                Image URL
                            </label>

                            <input
                                type="text"
                                name="image_url"
                                value="{{ old('image_url', $content->image_url) }}"
                                class="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                            >
                        </div>

                        <div class="grid gap-6 md:grid-cols-2">

                            <div>
                                <label class="text-sm font-medium">
                                    Button Text
                                </label>

                                <input
                                    type="text"
                                    name="button_text"
                                    value="{{ old('button_text', $content->button_text) }}"
                                    class="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                                >
                            </div>

                            <div>
                                <label class="text-sm font-medium">
                                    Button URL
                                </label>

                                <input
                                    type="text"
                                    name="button_url"
                                    value="{{ old('button_url', $content->button_url) }}"
                                    class="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                                >
                            </div>

                        </div>

                        <div>
                            <label class="text-sm font-medium">
                                Sort Order
                            </label>

                            <input
                                type="number"
                                name="sort_order"
                                min="0"
                                value="{{ old('sort_order', $content->sort_order) }}"
                                class="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                            >
                        </div>

                        <label class="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="is_active"
                                value="1"
                                @checked(old('is_active', $content->is_active))
                                class="h-4 w-4"
                            >

                            <span class="text-sm">
                                Display this content on the website
                            </span>
                        </label>

                    </div>

                    <div class="mt-8 border-t border-[#eeeae2] pt-6">
                        <button
                            type="submit"
                            class="border border-[#242321] bg-[#242321] px-7 py-3 text-sm text-white transition hover:bg-[#3a3834]"
                        >
                            Save Changes
                        </button>
                    </div>

                </div>
            </form>

        </div>
    </div>
</x-app-layout>