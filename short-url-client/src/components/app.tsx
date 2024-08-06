import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PathName } from "models/enums/pathName"

import UrlShortcutForm from "./urlShortcutForm/urlShortcutForm"
import UrlShortcutTable from "./urlShortcutTable/urlShortcutTable"
import Library from "./library/library"


const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={PathName.HOME} element={<Library />}>
					<Route path={PathName.CREATE_SHORTCUT_URL} element={<UrlShortcutForm />} />
					<Route path={PathName.BEST_DOMAINS_TABLE} element={<UrlShortcutTable />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
