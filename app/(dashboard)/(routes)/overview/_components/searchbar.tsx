import SearchLine from "./search";

const Searchbar = () => {
    return (
        <div className="top-0 sticky z-10 bg-background">
            <div className="max-w-xl mx-auto flex flex-row items-center justify-around">
                <SearchLine onRequest={handleRequest} onLoading={handleLoading}/>
            </div>
        </div>
    );
}
 
export default Searchbar;