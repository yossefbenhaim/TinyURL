import { useEffect } from "react";
import { useAppSelector } from "redux/store";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUrlShortcut } from "redux/slice/shortenedUrlList";

const UrlShortcutTable = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/urls/getShortenedUrl');
				console.log(response.data.data, '==================');
				dispatch(setUrlShortcut(response.data.data));
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error('AxiosError:', error.response?.data || error.message);
				} else {
					console.error('Unexpected Error:', error);
				}
			}
		};

		fetchData();
	}, []);

	const urlShortcutList = useAppSelector((state) => state.shortenedUrlList.ShortenedUrlList);
	console.log(urlShortcutList);

	return (
		<div className="container w-[500px] my-8">
			<table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
				<thead>
					<tr className="bg-gray-200">
						<th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">Full URL</th>
						<th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">Short URL</th>
						<th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">Clicks</th>
					</tr>
				</thead>
				<tbody>
					{
						urlShortcutList.map((url) => (
							<tr key={url.shortUrl} className="border-t border-gray-200">
								<td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{url.fullUrl}</td>
								<td className="py-4 px-6 whitespace-nowrap text-sm text-blue-500">
									<a href="#" className="hover:underline">{url.shortUrl}</a>
								</td>
								<td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{url.clicks}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	);
}

export default UrlShortcutTable;
