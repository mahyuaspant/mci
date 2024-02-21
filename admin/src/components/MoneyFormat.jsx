import { NumericFormat } from "react-number-format";

const MoneyFormat = ({ value, defaultValue, setValue, disabled = false }) => {
  return (
    <div className="flex gap-2 items-center">
      {/* {disabled && "Rp."} */}
      <span>Rp.</span>
      <NumericFormat
        disabled={disabled}
        className={`p-2 rounded-lg border border-gray-400 w-full disabled:p-0 disabled:bg-white disabled:border-none disabled:text-black `}
        value={value}
        defaultValue={defaultValue}
        allowLeadingZeros
        thousandSeparator=","
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default MoneyFormat;
