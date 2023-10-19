const InputRow = () => {
  return (
    <div className="flex gap-x-6 my-2">
      <input className="p-2 w-40 border " placeholder="Input the amount"/>
      <input className="p-2 w-60 border " placeholder="Input recipient address"/>
    </div>
  )
}

export default InputRow;