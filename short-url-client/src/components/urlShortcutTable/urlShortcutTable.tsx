import { clickOnShortUrl, setShortenedUrlList } from "redux/slice/shortenedUrlList";
import { useAppSelector } from "redux/store";
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from "react";

import axios from 'axios';

const UrlShortcutTable = () => {
	const dispatch = useDispatch();
	const urlShortcutList = useAppSelector((state) => state.shortenedUrlList.ShortenedUrlList);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/urls/getShortenedUrl');
				dispatch(setShortenedUrlList(response.data.data));
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

	const handleClick = async (shortUrl: string) => {
		try {
			const response = await axios.post(`http://localhost:5000/api/urls/clickOnShortUrl/`, { shortUrl });
			if (response.status === 200) {
				dispatch(clickOnShortUrl(shortUrl));
			}
		} catch (error) {
			console.error('Error tracking click:', error);
		}
	};

	const topUrlShortcut = useMemo(() => {
		return [...urlShortcutList].sort((a, b) => b.clicks - a.clicks)
	}, [urlShortcutList])

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
						topUrlShortcut.map((url) => (
							<tr key={url.shortUrl} className="border-t border-gray-200">
								<td className="py-4 px-6 whitespace-nowrap text-sm  text-gray-700">
									<a href={url.fullUrl} className="hover:underline block w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{url.fullUrl}</a>
								</td>
								<td className="py-4 px-6 whitespace-nowrap text-sm text-blue-500">
									<a
										href={url.fullUrl}
										className="hover:underline"
										onClick={() => handleClick(url.shortUrl)}
									>
										{url.shortUrl}
									</a>
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
