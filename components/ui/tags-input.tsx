// components/TagsInput.tsx
import { useState } from 'react';
import { X } from 'lucide-react';

interface TagsInputProps {
	tags: string[];
	setTags: (tags: string[]) => void;
}

export default function TagsInput({ tags, setTags }: TagsInputProps) {
	const [input, setInput] = useState('');

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
			e.preventDefault();
			if (!tags.includes(input.trim())) {
				setTags([...tags, input.trim()]);
			}
			setInput('');
		} else if (e.key === 'Backspace' && input === '') {
			setTags(tags.slice(0, -1));
		}
	};

	const removeTag = (index: number) => {
		const newTags = [...tags];
		newTags.splice(index, 1);
		setTags(newTags);
	};

	return (
		<>
			{tags
				? tags.map((tag, idx) => (
						<span
							key={idx}
							className='bg-blue-100 text-blue-700 px-4 py-2 rounded-full flex items-center dark:bg-blue-600/20 dark:text-blue-300 text-sm border border-blue-600'>
							{tag}
							<button
								onClick={() => removeTag(idx)}
								className='ml-1 text-sm hover:text-red-500'
								title='Remove'>
								<X className='w-3 h-3' />
							</button>
						</span>
				  ))
				: null}

			<div className='flex flex-wrap items-center gap-2 border rounded'>
				<div className='dark:border-gray-700 dark:bg-gray-800 px-2 py-1'>
					<input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='Add a tag'
						className='flex-grow bg-transparent outline-none text-sm text-gray-700 dark:text-gray-100'
					/>
				</div>
			</div>
		</>
	);
}
