import React from "react";
import Select from "react-select";
import Theme from "../../theme";

interface Props {
  width?: number;
  options: {
    value: any;
    label: string;
  }[];
  value: string;
  onChange?: (value: string | null) => void;
}

export default function MiniSelect({
  options,
  value,
  width,
  onChange = () => {}
}: Props) {

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      height: "28px",
      color: "white",
      textAlign: "center",
      padding: "0",
      margin: "0",
      backgroundColor: Theme.colors.textBoxColor,
      "&:hover": {
        backgroundColor: Theme.colors.textBoxHover
      },
      ":active": {
        ...provided[":active"],
        backgroundColor: Theme.colors.textBoxHover
      }
    }),
    control: (provided: any) => ({
      ...provided,
      padding: 0,
      minHeight: "26px",
      height: "26px",
      // height: "auto",
      backgroundColor: Theme.colors.textBoxColor,
      color: Theme.colors.textColor,
      // border: `1px solid ${Theme.colors.textboxBorder}`,
      // borderWidth: '1px 1px 1px 0',
      borderStyle: "solid",
      borderColor: Theme.colors.textboxBorder,
      // ":hover": {
      //   borderColor: Theme.colors.textboxBorder
      // },
      borderRadius: "0",
      fontSize: "11px"
    }),
    container: (provided: any) => ({
      ...provided,
      width: "100%",
      maxWidth: "36px",
      color: Theme.colors.textColor
    }),
    valueContainer: (provided: any) => {
      return {
        ...provided,
        padding: "0 0"
      }
    },
    input: (provided: any) => {
      return {
        ...provided,
        padding: "0"
      }
    },
    singleValue: (provided: any, state: any) => {
      return { 
        ...provided,
        color: Theme.colors.textColor,
        maxWidth: "100%",
        width: "100%",
        height: "100%",
        textAlign: "center",
        margin: 0
      };
    },
    placeholder: (provided: any) => ({
      ...provided,
      color: Theme.colors.textColor
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      width: 0
    }),
    indicatorContainer: (provided: any) => ({
      ...provided,
      display: "none"
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: "0",
      width: "0"
    }),
    menuList: (provided: any) => ({
      ...provided,
      backgroundColor: Theme.colors.textBoxColor
    }),
    menu: (provided: any) => ({
      ...provided,
      padding: "0px",
      backgroundColor: Theme.colors.textBoxColor,
      fontSize: '11px',
      width: '100%',
      minWidth: '36px',
      zIndex: '100'
    })
  };

  return (<Select
    value={options.find(option => option.value === value) || null}
    options={options}
    styles={customStyles}
    menuPlacement="auto"
    onChange={(option: any) => {
      console.log(option)
      if (option && option.value) {
        onChange(option.value);
      } else {
        onChange(null);
      }
    }}
  />)
}
