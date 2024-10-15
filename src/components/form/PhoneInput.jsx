import { useEffect, useState } from "react";
import Indonesia from "../../assets/img/Indonesia_Flag.png";
import Singapore from "../../assets/img/Singapore_Flag.png";

const PhoneInput = ({
  setPhoneData,
  existingVal = "",
  isValid = true,
  isSubmitAction = false,
}) => {
  const tempPhoneData = [
    {
      code: "+62",
      country: "Indonesia",
      flag: Indonesia,
    },
    {
      code: "+65",
      country: "Singapore",
      flag: Singapore,
    },
  ];

  let defaultCountryCodeIndex = 0;
  if (existingVal !== "") {
    let countryCode = existingVal.slice(0, 3);
    defaultCountryCodeIndex = tempPhoneData.findIndex(
      (x) => x.code == countryCode
    );
    existingVal = existingVal.slice(3, existingVal.length);
  }

  const [isValidPhone, setIsValidPhone] = useState(isValid);
  const [ddlVal, setDdlVal] = useState(tempPhoneData[defaultCountryCodeIndex]);
  const [showDropdown, setShowDropDown] = useState(false);
  const [phoneInput, setPhoneInput] = useState(existingVal);

  const setPhoneInputHandler = (e) => {
    setPhoneInput(e.target.value);
    const phoneData = {
      phone: ddlVal.code + e.target.value,
    };
    setPhoneData(phoneData.phone);
  };

  const onUserInputHandler = () => {
    if (phoneInput == "") {
      setIsValidPhone(false);
    }
  };

  const btnPhoneHandler = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropdown);
  };

  const selectedPhoneHandler = (e, data) => {
    e.preventDefault();
    setDdlVal(data);
    setPhoneInput(""); //if change country code, reset the phone number input
    setShowDropDown(false);
  };

  useEffect(() => {
    if (isSubmitAction) {
      onUserInputHandler();
    }
  }, [isSubmitAction]);

  return (
    <div className="flex flex-col items-start mb-3">
      <label htmlFor="phone">
        No. Hp <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-3 w-full gap-3">
        <div className="col-span-1 relative">
          <button
            onClick={btnPhoneHandler}
            className="flex items-center gap-3 border rounded-md p-2 w-full"
          >
            <img
              src={ddlVal.flag}
              alt={ddlVal.country}
              className="w-[20px] h-[20px]"
              loading="lazy"
            />
            <div className="flex justify-between items-center w-full">
              <span>{ddlVal.code}</span>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </button>

          <ul
            className={`absolute top-10 end-0 w-full border bg-white z-10  ${
              showDropdown ? "" : "hidden"
            }`}
          >
            {tempPhoneData.map((temp, id) => {
              return (
                <li className="hover:bg-slate-300" key={id}>
                  <button
                    onClick={(e) => selectedPhoneHandler(e, temp)}
                    className="flex items-center gap-3  rounded-md p-2 w-full"
                  >
                    <img
                      src={temp.flag}
                      alt={temp.country}
                      className="w-[20px] h-[20px]"
                      loading="lazy"
                    />
                    <span>{temp.code}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <input
          className="col-span-2 border rounded-md px-2"
          type="number"
          name="phone"
          id="phone"
          value={phoneInput}
          onChange={(e) => setPhoneInputHandler(e)}
          onBlur={(e) => onUserInputHandler(e)}
          required
        />
      </div>
      {!isValidPhone && (
        <span className="text-red-500">*Nomor Hp tidak boleh kosong</span>
      )}
    </div>
  );
};

export default PhoneInput;
