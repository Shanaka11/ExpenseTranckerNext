import { ComponentType } from 'react';
import Select, {
	ControlProps,
	GroupBase,
	components,
	Props as SelectProps,
} from 'react-select';

const Autocomplete = (props: any) => {
	return (
		<Select
			{...props}
			maxMenuHeight={150}
			isMulti
			name='colors'
			// options={options}
			unstyled
			components={{ Control }}
			placeholder=' '
			classNames={{
				control: ({ isFocused }) =>
					`border-1 block w-full appearance-none rounded-lg border p-2 text-sm text-gray-900 ${
						isFocused
							? 'border-blue-600 outline-none ring-0'
							: 'border-gray-300'
					}`,
				option: () => `p-2 hover:bg-gray-300 cursor-pointer transition-colors`,
				menu: () => `mt-1 rounded-lg border border-gray-300 overflow-hidden`,
				multiValue: () => `bg-blue-400 mr-1 rounded text-white overflow-hidden`,
				multiValueLabel: () => `pt-1 pl-2 pb-1 pr-1`,
				multiValueRemove: () => 'p-1 hover:bg-blue-500',
			}}
		/>
	);
};

const Control:
	| ComponentType<
			ControlProps<
				| {
						value: number;
						label: string;
				  }
				| {
						value: string;
						label: string;
				  },
				true,
				GroupBase<
					| {
							value: number;
							label: string;
					  }
					| {
							value: string;
							label: string;
					  }
				>
			>
	  >
	| undefined = (props) => {
	const getDynamicStyles = (hasValue: boolean, isFocused: boolean) => {
		if (isFocused) return 'text-blue-600 -translate-y-4 scale-75';
		if (hasValue) return 'text-gray-500 -translate-y-4 scale-75';
		return 'text-gray-500';
	};

	return (
		<div className='relative'>
			<label
				className={`absolute left-1 top-2 z-10 origin-[0] transform bg-white px-2 text-sm duration-300 ${getDynamicStyles(
					props.hasValue,
					props.isFocused
				)}`}
			>
				Tags
			</label>
			<components.Control {...props} />
		</div>
	);
};

export default Autocomplete;
