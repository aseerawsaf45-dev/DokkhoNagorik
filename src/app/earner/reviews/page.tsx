"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";
import { Star, MessageSquare } from "lucide-react";

export default function ReviewsPage() {
  const { currentUser } = useApp();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    setReviews(mockStore.getReviews(currentUser.id));
  }, [currentUser]);

  if (!currentUser) return null;

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Client Reputation
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            Reviews & Testimonials
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ratings left by SME clients following completed milestone reviews.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl shrink-0">
          <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          <div>
            <div className="text-xl font-extrabold text-amber-950 leading-none">{averageRating}</div>
            <span className="text-[10px] text-amber-700">{reviews.length} Verified Reviews</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{rev.fromUserName}</h4>
                <span className="text-[11px] text-slate-400">
                  Project: {rev.projectTitle} • {formatDate(rev.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(Math.floor(rev.rating))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
