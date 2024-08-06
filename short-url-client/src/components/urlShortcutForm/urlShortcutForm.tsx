import UrlShortcutSchema, { UrlShortcutFormKeys, UrlShortcutType } from './urlShortcutSchema';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { addShortenedUrl } from 'redux/slice/shortenedUrlList';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import axios from 'axios';

const UrlShortcutForm = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const methods = useForm<UrlShortcutType>({
		defaultValues: {
			fullUrl: ''
		},
		resolver: zodResolver(UrlShortcutSchema)
	});

	const { handleSubmit, control, formState: { errors } } = methods;

	const onSubmit = async (data: UrlShortcutType) => {
		setIsLoading(true);
		setSuccessMessage('');
		try {
			const { fullUrl } = data;

			const response = await axios.post('http://localhost:5000/api/urls/createShortenedUrl/abc123', { fullUrl });

			if (response.status === 200) {
				const { clicks, shortUrl } = response.data;

				dispatch(addShortenedUrl({
					clicks,
					fullUrl,
					shortUrl
				}));

				setSuccessMessage('URL successfully shortened!');
			}

		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('AxiosError:', error.response?.data || error.message);
			} else {
				console.error('Unexpected Error:', error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 text-black">
				<header className='text-2xl'>URL Shrinker</header>
				<div className='flex flex-row justify-between items-center h-[40px] w-[300px] gap-2'>
					<Controller
						name={UrlShortcutFormKeys.FULL_URL}
						control={control}
						render={({ field }) => (
							<div className='h-full'>
								<input
									{...field}
									className='h-full px-1 rounded-lg border-black border-[2px]'
									type='url'
									name='fullUrl'
									id='fullUrl'
								/>
								{errors[UrlShortcutFormKeys.FULL_URL] && (
									<span className='text-red-500'>{errors[UrlShortcutFormKeys.FULL_URL].message}</span>
								)}
							</div>
						)}
					/>
					<div>
						<button type='submit' className='w-[70px] bg-green-300 hover:bg-green-500 rounded-lg border-black border-[1px]' disabled={isLoading}>
							{isLoading ? 'Loading...' : 'Short'}
						</button>
					</div>
				</div>
				{successMessage && (
					<div className='text-green-500 mt-2'>
						{successMessage}
					</div>
				)}
			</form>
		</FormProvider>
	);
}

export default UrlShortcutForm;
