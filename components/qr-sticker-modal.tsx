'use client';

import { QRCodeSVG } from 'qrcode.react';
import { ToolData } from '@/types/tool';
import { Printer, X, Download } from 'lucide-react';

interface QrStickerModalProps {
  tool: ToolData;
  onClose: () => void;
}

export default function QrStickerModal({ tool, onClose }: QrStickerModalProps) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const qrUrl = `${origin}/tool/${tool.slug}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between no-print">
          <div>
            <h3 className="text-base font-bold text-white">Stiker Label QR Laboratorium</h3>
            <p className="text-xs text-neutral-400">Siap dicetak dan ditempelkan pada fisik alat</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Sticker Card */}
        <div className="p-6 flex flex-col items-center justify-center bg-neutral-950">
          <div
            id="printable-sticker"
            className="w-full bg-white text-black p-6 rounded-xl border-2 border-neutral-900 shadow-lg flex flex-col items-center text-center space-y-3 print:border-black print:shadow-none"
          >
            {/* Lab Tag Header */}
            <div className="w-full flex items-center justify-between border-b border-black/20 pb-2">
              <span className="font-mono text-[11px] font-bold tracking-widest uppercase bg-black text-white px-2 py-0.5 rounded">
                SMART LAB QR
              </span>
              <span className="font-mono text-xs font-bold text-neutral-800">
                {tool.code}
              </span>
            </div>

            {/* QR Code with clean high contrast */}
            <div className="p-3 bg-white border-2 border-black rounded-lg">
              <QRCodeSVG
                value={qrUrl}
                size={180}
                level="H"
                includeMargin={false}
              />
            </div>

            {/* Tool Information */}
            <div className="space-y-1 w-full">
              <h4 className="text-base font-extrabold leading-tight tracking-tight text-black">
                {tool.name}
              </h4>
              <p className="text-[11px] text-neutral-600 font-medium line-clamp-1">
                {tool.location}
              </p>
            </div>

            {/* Instruction banner */}
            <div className="w-full pt-2 border-t border-black/10">
              <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-black">
                📲 Scan QR untuk Asisten Belajar Mandiri
              </p>
              <p className="text-[9px] font-mono text-neutral-500 break-all pt-0.5">
                {qrUrl}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex items-center justify-end gap-2.5 no-print">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-neutral-800 text-xs font-medium text-neutral-300 hover:bg-neutral-800 transition-all"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Stiker (Print)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
