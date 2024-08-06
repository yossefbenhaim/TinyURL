import UrlShortcutForm from "./urlShortcutForm/urlShortcutForm"
import UrlShortcutTable from "./urlShortcutTable/urlShortcutTable"


function App() {
	return (
		<div className="flex flex-col gap-5  p-5">
			<UrlShortcutForm />
			<UrlShortcutTable />
		</div>
	)
}

export default App
