'use client';

import { useRef, useState } from "react";
import { SimpleProperty } from "../model/simple-property";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select/creatable';

export type SimplePropertyBlockProps = {
  type: string,
  properties: SimpleProperty[],
  defaultProperties?: SimpleProperty[],
  isCreatable: boolean,
  isMulti: boolean,
  isClearable: boolean
}

type Option = {
  value: string,
  label: string
}

export default function SimplePropertyBlock(props: SimplePropertyBlockProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  const options: Option[] = props.properties.map(p => {
    return {
      label: p.description ?? p.name,
      value: p.name
    }
  });

  const defaultValues: Option[] = [];

  if (props.defaultProperties) {
    // TODO
  }


  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{props.type}</span>
      </label>
      {props.isCreatable ?
      <CreatableSelect isClearable={props.isClearable} isMulti={props.isMulti} options={options}></CreatableSelect>
      :
      <Select isClearable={props.isClearable} isMulti={props.isMulti}  defaultValues={props.defaultValues!} options={options}></Select>}
      
    </div>
  );
}