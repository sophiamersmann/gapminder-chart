import type { Dispatch, ReactNode, SetStateAction, CSSProperties } from 'react';
import ReactSelect, { StylesConfig } from 'react-select';
import { rollups } from 'd3-array';
import chroma from 'chroma-js';

import { cBlack } from '../../styles/colors';
import styles from './GroupedSelect.module.css';

interface SelectOption<T> {
  label: string;
  value: T;
}

interface SelectGroup<O> {
  label: string;
  options: O[];
}

interface Props<T> {
  id: string;
  label: ReactNode;
  placeholder?: string;
  values: T[];
  selectedValue?: T;
  setSelectedValue: Dispatch<SetStateAction<T | undefined>>;
  group: (value: T) => string;
  format?: (value: T) => string;
  color?: (value: T) => string;
  examples?: T[];
}

export default function GroupedSelect<T extends { toString: () => string }>({
  id,
  label,
  placeholder,
  values,
  selectedValue,
  setSelectedValue,
  group,
  format = (value) => value.toString(),
  color = () => 'var(--c-blue)',
  examples = [],
}: Props<T>) {
  // group values
  const groupedValues = rollups(
    values,
    (values) => ({
      label: group(values[0]),
      options: values.map((value) => ({ value, label: format(value) })),
    }),
    (value) => group(value)
  ).map(([, value]) => value);

  // custom styles
  const selectStyles: StylesConfig<
    SelectOption<T>,
    false,
    SelectGroup<SelectOption<T>>
  > = {
    control: (provided, state) => ({
      ...provided,
      fontSize: 'var(--font-size-sm)',
      border: '1px solid var(--c-gray-400)',
      '&:hover': {
        borderColor: 'var(--c-gray-400)',
      },
      boxShadow: 'none',
      outline: state.isFocused ? '1.5px solid var(--c-focus)' : '',
      outlineOffset: '0.1em',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      ':before': {
        backgroundColor: color(state.data.value),
        borderRadius: '50%',
        content: '" "',
        display: 'block',
        marginRight: 'var(--s-px-2)',
        height: '0.6em',
        width: '0.6em',
      },
    }),
    option: (provided, state) => {
      const bgColor = chroma(color(state.data.value));
      const textColor =
        chroma.contrast(bgColor, cBlack) >= 4.5
          ? cBlack
          : 'rgb(255, 255, 255, 0.9)';
      return {
        ...provided,
        backgroundColor: state.isSelected
          ? bgColor.css()
          : state.isFocused
          ? bgColor.alpha(0.1).css()
          : undefined,
        color: state.isSelected ? textColor : 'var(--c-black)',
        fontSize: 'var(--font-size-sm)',
      };
    },
  };

  // custom group label
  const formatGroupLabel = (data: SelectGroup<SelectOption<T>>) => (
    <div
      className={styles.groupLabel}
      style={{ color: color(data.options[0].value) }}
    >
      {data.label}
    </div>
  );

  return (
    <>
      <div id={`${id}-label`} className={styles.label}>
        {label}
      </div>
      <ReactSelect<SelectOption<T>, false, SelectGroup<SelectOption<T>>>
        instanceId={id}
        value={
          selectedValue
            ? { label: format(selectedValue), value: selectedValue }
            : undefined
        }
        placeholder={placeholder}
        options={groupedValues}
        formatGroupLabel={formatGroupLabel}
        isClearable={true}
        noOptionsMessage={() => 'No search results'}
        onChange={(selectedOption) => setSelectedValue(selectedOption?.value)}
        styles={selectStyles}
        aria-labelledby={`${id}-label`}
      />
      {examples.length > 0 && (
        <div className={styles.examples}>
          Examples:{' '}
          <div>
            {examples.map((example) => (
              <Button
                key={example.toString()}
                value={example}
                setValue={setSelectedValue}
                color={color(example)}
              >
                {format(example)}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function Button<T extends { toString: () => string }>({
  value,
  setValue,
  color = cBlack,
  children,
}: {
  value: T;
  setValue: Props<T>['setSelectedValue'];
  color?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={styles.btnExample}
      onClick={() => setValue(value)}
      style={
        {
          '--color': color,
          '--color-light': chroma(color).alpha(0.2).css(),
        } as CSSProperties
      }
    >
      {children}
    </button>
  );
}
