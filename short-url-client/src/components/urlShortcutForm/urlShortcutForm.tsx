import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UrlShortcutSchema, { UrlShortcutFormKeys, UrlShortcutType } from './urlShortcutSchema';
import { useDispatch } from 'react-redux';
import { addUrlShortcut } from 'redux/slice/shortenedUrlList';
import axios from 'axios';

const UrlShortcutForm = () => {
	const dispatch = useDispatch();

	const methods = useForm<UrlShortcutType>({
		defaultValues: {
			fullUrl: ''
		},
		resolver: zodResolver(UrlShortcutSchema)
	});

	const { handleSubmit, control, formState: { errors } } = methods;

	const onSubmit = async (data: UrlShortcutType) => {
		try {
			const { fullUrl } = data;
			const response = await axios.post('http://localhost:5000/api/urls/createShortenedUrl', { fullUrl });
			console.log(response.data, 'Response from backend');

			const { clicks, shortUrl } = response.data;

			dispatch(addUrlShortcut({
				clicks,
				fullUrl,
				shortUrl
			}));
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('AxiosError:', error.response?.data || error.message);
			} else {
				console.error('Unexpected Error:', error);
			}
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
						<button type='submit' className='w-[70px] bg-green-300 hover:bg-green-500 rounded-lg border-black border-[1px]'>Short</button>
					</div>
				</div>
			</form>
		</FormProvider>
	);
}

export default UrlShortcutForm;
