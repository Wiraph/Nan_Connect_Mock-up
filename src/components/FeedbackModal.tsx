"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function FeedbackModal({
  placeName,
  onClose,
}: {
  placeName: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl bg-white p-5 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <i className="ti ti-circle-check-filled text-4xl text-gold" aria-hidden />
            <p className="font-semibold text-navy">{t("feedback.thanks")}</p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-navy px-6 py-2 text-sm text-cream"
            >
              {t("common.back")}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-semibold text-navy">{t("feedback.title")}</h3>
              <button onClick={onClose} aria-label="Close" className="text-muted">
                <i className="ti ti-x text-xl" aria-hidden />
              </button>
            </div>
            <p className="text-xs text-muted">{placeName}</p>

            <div className="my-3 flex justify-center gap-2 text-3xl text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setStars(i + 1)} aria-label={`${i + 1} stars`}>
                  <i className={`ti ${i < stars ? "ti-star-filled" : "ti-star"}`} aria-hidden />
                </button>
              ))}
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("feedback.placeholder")}
              rows={3}
              className="w-full resize-none rounded-xl border border-line bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-navy-300"
            />

            <button
              onClick={() => setSent(true)}
              className="mt-3 w-full rounded-full bg-navy py-2.5 text-sm font-medium text-cream transition hover:bg-navy-600"
            >
              {t("feedback.submit")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
