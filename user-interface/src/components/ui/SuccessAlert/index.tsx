const SuccessAlert = () => {
  return (
    <div className="bg-green-100 rounded-md p-3 flex max-w-3xl">
    <svg
        className="stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M0 0h24v24H0z" stroke="none" />
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
    </svg>

    <div className="text-green-700">
        <div className="font-bold text-xl">Your request was successful!</div>

        <div>You will receive a an email containing a document to sign shortly</div>
    </div>
</div>
  )
}

export default SuccessAlert;