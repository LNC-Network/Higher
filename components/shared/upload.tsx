import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useMessage } from '@/context/GeminiOutput';
import { useRouter } from 'next/navigation';

const UploadButton: React.FC = () => {
	const router = useRouter();
	const { message } = useMessage('');
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleUpload = async () => {
		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					description,
					content: message,
				}),
			});

			if (!res.ok) {
				const err = await res.json();
				console.error('Upload failed:', err.error);
			} else {
				console.log('Upload successful');
				setOpen(false); // Close dialog on success
			}
			router.push('/profile');
		} catch (err) {
			console.error('Unexpected error:', err);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md'>
					<Upload size={18} />
					Upload
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-white max-w-md'>
				<DialogHeader>
					<DialogTitle>Upload Content</DialogTitle>
					<DialogDescription>
						Provide a title and description before uploading to the database.
					</DialogDescription>
				</DialogHeader>

				<div className='mt-4 space-y-4'>
					<Input
						placeholder='Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Textarea
						placeholder='Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={5}
					/>
				</div>

				<DialogFooter className='mt-6 flex justify-end gap-3'>
					<Button variant='outline' onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						className='bg-indigo-600 hover:bg-indigo-700 text-white'
						onClick={handleUpload}>
						Upload
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UploadButton;
