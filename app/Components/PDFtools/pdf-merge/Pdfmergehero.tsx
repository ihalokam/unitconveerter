'use client';

import React, { useState, useRef, useCallback } from 'react';

interface PDFFile {
    id: string;
    file: File;
    name: string;
    size: string;
    pages?: number;
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PDFMergeHero() {
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOverId, setDragOverId] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [status, setStatus] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const addFiles = (newFiles: FileList | File[]) => {
        const pdfs = Array.from(newFiles).filter(
            (f) => f.type === 'application/pdf' || f.name.endsWith('.pdf')
        );
        if (pdfs.length === 0) {
            setStatus('Only PDF files are accepted.');
            return;
        }
        setStatus('');
        const mapped: PDFFile[] = pdfs.map((f) => ({
            id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
            file: f,
            name: f.name,
            size: formatBytes(f.size),
        }));
        setFiles((prev) => [...prev, ...mapped]);
    };

    const handleDropZone = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    };

    const handleDragOverZone = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        setFiles((prev) => {
            const arr = [...prev];
            [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
            return arr;
        });
    };

    const moveDown = (index: number) => {
        setFiles((prev) => {
            if (index === prev.length - 1) return prev;
            const arr = [...prev];
            [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
            return arr;
        });
    };

    // Drag-to-reorder handlers
    const onDragStart = (e: React.DragEvent, id: string) => {
        setDraggingId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnterItem = (e: React.DragEvent, id: string) => {
        e.preventDefault();
        if (id !== draggingId) setDragOverId(id);
    };

    const onDragOverItem = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const onDropItem = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (!draggingId || draggingId === targetId) return;
        setFiles((prev) => {
            const arr = [...prev];
            const fromIdx = arr.findIndex((f) => f.id === draggingId);
            const toIdx = arr.findIndex((f) => f.id === targetId);
            const [item] = arr.splice(fromIdx, 1);
            arr.splice(toIdx, 0, item);
            return arr;
        });
        setDraggingId(null);
        setDragOverId(null);
    };

    const onDragEnd = () => {
        setDraggingId(null);
        setDragOverId(null);
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            setStatus('Add at least 2 PDF files to merge.');
            return;
        }
        setIsProcessing(true);
        setStatus('Loading PDF engine…');

        try {
            // Dynamically import pdf-lib (must be installed: npm install pdf-lib)
            const { PDFDocument } = await import('pdf-lib');
            setStatus('Merging documents…');

            const mergedPdf = await PDFDocument.create();

            for (const pdfFile of files) {
                const arrayBuffer = await pdfFile.file.arrayBuffer();
                const srcDoc = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(
                    srcDoc,
                    srcDoc.getPageIndices()
                );
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedBytes = await mergedPdf.save();
            const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'merged.pdf';
            a.click();
            URL.revokeObjectURL(url);

            setStatus(`Done! ${files.length} PDFs merged successfully.`);
        } catch (err) {
            console.error(err);
            setStatus('Merge failed. Make sure pdf-lib is installed: npm install pdf-lib');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <section className="hero-section">
            {/* Drop Zone */}
            <div
                className={`drop-zone ${isDragOver ? 'drop-zone--active' : ''}`}
                onDrop={handleDropZone}
                onDragOver={handleDragOverZone}
                onDragLeave={() => setIsDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Upload PDF files"
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    multiple
                    className="hidden-input"
                    onChange={(e) => e.target.files && addFiles(e.target.files)}
                />
                <div className="drop-zone__icon" aria-hidden="true">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect x="6" y="4" width="22" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M24 4v8h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M28 30v6M25 33l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <p className="drop-zone__primary">
                    {isDragOver ? 'Drop PDFs here' : 'Drop PDFs here or click to browse'}
                </p>
                <p className="drop-zone__secondary">Multiple files supported · Reorder after upload</p>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="file-list">
                    <div className="file-list__header">
                        <span className="eyebrow">Merge Queue — {files.length} file{files.length !== 1 ? 's' : ''}</span>
                        <button className="btn-ghost" onClick={() => setFiles([])}>Clear all</button>
                    </div>

                    <ol className="file-list__items" aria-label="PDF files in merge order">
                        {files.map((f, index) => (
                            <li
                                key={f.id}
                                className={`file-item ${draggingId === f.id ? 'file-item--dragging' : ''} ${dragOverId === f.id ? 'file-item--dragover' : ''}`}
                                draggable
                                onDragStart={(e) => onDragStart(e, f.id)}
                                onDragEnter={(e) => onDragEnterItem(e, f.id)}
                                onDragOver={onDragOverItem}
                                onDrop={(e) => onDropItem(e, f.id)}
                                onDragEnd={onDragEnd}
                            >
                                <span className="file-item__number" aria-label={`Position ${index + 1}`}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="file-item__drag-handle" aria-hidden="true" title="Drag to reorder">
                                    ⠿
                                </span>
                                <div className="file-item__info">
                                    <span className="file-item__name">{f.name}</span>
                                    <span className="file-item__meta">{f.size}</span>
                                </div>
                                <div className="file-item__actions">
                                    <button
                                        className="btn-icon"
                                        onClick={() => moveUp(index)}
                                        disabled={index === 0}
                                        aria-label={`Move ${f.name} up`}
                                        title="Move up"
                                    >↑</button>
                                    <button
                                        className="btn-icon"
                                        onClick={() => moveDown(index)}
                                        disabled={index === files.length - 1}
                                        aria-label={`Move ${f.name} down`}
                                        title="Move down"
                                    >↓</button>
                                    <button
                                        className="btn-icon btn-icon--remove"
                                        onClick={() => removeFile(f.id)}
                                        aria-label={`Remove ${f.name}`}
                                        title="Remove"
                                    >✕</button>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="merge-footer">
                        {status && (
                            <p className={`status-msg ${status.toLowerCase().includes('fail') || status.toLowerCase().includes('only') || status.toLowerCase().includes('at least') ? 'status-msg--error' : status.toLowerCase().includes('done') ? 'status-msg--success' : ''}`}>
                                {status}
                            </p>
                        )}
                        <button
                            className="btn-merge"
                            onClick={handleMerge}
                            disabled={isProcessing || files.length < 2}
                            aria-busy={isProcessing}
                        >
                            {isProcessing ? 'Merging…' : `Merge ${files.length} PDF${files.length !== 1 ? 's' : ''} →`}
                        </button>
                    </div>
                </div>
            )}

            {files.length === 0 && status && (
                <p className="status-msg status-msg--error" style={{ marginTop: '0.75rem', textAlign: 'center' }}>{status}</p>
            )}

            <style jsx>{`
        .hero-section {
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Drop Zone */
        .drop-zone {
          border: 1.5px dashed #3a3f4a;
          border-radius: 8px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          background: #0f1117;
          color: #8b93a5;
        }
        .drop-zone:hover,
        .drop-zone--active {
          border-color: #5b8af0;
          background: #111827;
          color: #c0cadc;
        }
        .drop-zone:focus-visible {
          outline: 2px solid #5b8af0;
          outline-offset: 3px;
        }
        .hidden-input {
          display: none;
        }
        .drop-zone__icon {
          margin-bottom: 1rem;
          color: inherit;
        }
        .drop-zone__primary {
          font-size: 1rem;
          font-weight: 500;
          color: #c0cadc;
          margin: 0 0 0.35rem;
        }
        .drop-zone__secondary {
          font-size: 0.78rem;
          color: #5a6170;
          margin: 0;
          font-family: 'Geist Mono', monospace;
          letter-spacing: 0.02em;
        }

        /* File List */
        .file-list {
          margin-top: 1.5rem;
          border: 1px solid #1e2330;
          border-radius: 8px;
          overflow: hidden;
          background: #0a0c10;
        }
        .file-list__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #1e2330;
          background: #0d1017;
        }
        .eyebrow {
          font-family: 'Geist Mono', 'Courier New', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #5b8af0;
        }
        .btn-ghost {
          font-size: 0.75rem;
          color: #5a6170;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
        }
        .btn-ghost:hover {
          color: #e05555;
          background: #1a0d0d;
        }

        .file-list__items {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .file-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #131720;
          transition: background 0.15s;
          cursor: grab;
          user-select: none;
        }
        .file-item:last-child {
          border-bottom: none;
        }
        .file-item:hover {
          background: #0f1420;
        }
        .file-item--dragging {
          opacity: 0.4;
          cursor: grabbing;
        }
        .file-item--dragover {
          background: #111d35;
          border-color: #5b8af0;
        }
        .file-item__number {
          font-family: 'Geist Mono', monospace;
          font-size: 0.72rem;
          color: #3a4258;
          min-width: 1.8rem;
          text-align: right;
        }
        .file-item__drag-handle {
          font-size: 1.1rem;
          color: #2d3347;
          cursor: grab;
          line-height: 1;
        }
        .file-item__info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .file-item__name {
          font-size: 0.88rem;
          color: #c8d0e0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 450;
        }
        .file-item__meta {
          font-size: 0.7rem;
          color: #3f4b60;
          font-family: 'Geist Mono', monospace;
        }
        .file-item__actions {
          display: flex;
          gap: 0.3rem;
          flex-shrink: 0;
        }
        .btn-icon {
          width: 26px;
          height: 26px;
          border: 1px solid #1e2534;
          background: #0d1220;
          color: #4a5568;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          padding: 0;
        }
        .btn-icon:hover:not(:disabled) {
          color: #c0cadc;
          border-color: #3a4258;
          background: #131b2e;
        }
        .btn-icon:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }
        .btn-icon--remove:hover:not(:disabled) {
          color: #e05555;
          border-color: #3a1a1a;
          background: #1a0d0d;
        }

        /* Merge footer */
        .merge-footer {
          padding: 1rem;
          border-top: 1px solid #1e2330;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: #0d1017;
          flex-wrap: wrap;
        }
        .btn-merge {
          background: #5b8af0;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.65rem 1.4rem;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.2s, opacity 0.2s;
          white-space: nowrap;
          margin-left: auto;
        }
        .btn-merge:hover:not(:disabled) {
          background: #4a78e0;
        }
        .btn-merge:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .status-msg {
          font-family: 'Geist Mono', monospace;
          font-size: 0.75rem;
          color: #5a6880;
          margin: 0;
        }
        .status-msg--error {
          color: #e05555;
        }
        .status-msg--success {
          color: #4cad7d;
        }
      `}</style>
        </section>
    );
}