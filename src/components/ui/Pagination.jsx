export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-end gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="px-4 py-2">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}