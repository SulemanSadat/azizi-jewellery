<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentBlock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ContentController extends Controller
{
    public function index(): View
    {
        $content = ContentBlock::query()
            ->where('page', 'home')
            ->orderBy('sort_order')
            ->get();

        return view('admin.content.index', compact('content'));
    }

    public function edit(ContentBlock $content): View
    {
        return view('admin.content.edit', compact('content'));
    }

    public function update(
        Request $request,
        ContentBlock $content
    ): RedirectResponse {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string', 'max:2048'],
            'button_text' => ['nullable', 'string', 'max:255'],
            'button_url' => ['nullable', 'string', 'max:2048'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $validated['is_active'] = $request->boolean('is_active');

        $content->update($validated);

        return redirect()
            ->route('admin.content.index')
            ->with('success', 'Content updated successfully.');
    }
}