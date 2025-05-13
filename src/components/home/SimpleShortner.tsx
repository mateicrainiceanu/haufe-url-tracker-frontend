import React, {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import BeatLdr from "@/components/spinners/BeatLdr.tsx";
import api from "@/lib/api.ts";
import {useAlert} from "@/providers/AlertProvider.tsx";

enum UrlShortingState {
    INPUT,
    LOADING,
    SHORTENED
}

function SimpleShortner() {
    const [urlData, setUrlData] = useState({url: "", state: UrlShortingState.INPUT});
    const {handleAxiosError, addAlert} = useAlert();

    function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUrlData(prev => ({...prev, url: e.target.value}));
    }

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).then(() => {
            addAlert({
                variant: "success",
                title: "Copied!",
                message: "The url was successfully copied to your keyboard!"
            });
        });
    }

    function handleShorten() {
        setUrlData(prev => ({...prev, state: UrlShortingState.LOADING}));

        api.post("/redirect", {url: urlData.url}).then(res => {
            const redirect = res.data.redirect.keyword;
            const newUrl = import.meta.env.VITE_API_BASE + "/" + redirect
            setUrlData({state: UrlShortingState.SHORTENED, url: newUrl});
            copyToClipboard(newUrl);
        }).catch((error) => {
            handleAxiosError(error);
            setUrlData(prev => ({...prev, state: UrlShortingState.INPUT}));
        });
    }

    function handleClick() {
        switch (urlData.state) {
            case UrlShortingState.LOADING:
                return;
            case UrlShortingState.INPUT:
                handleShorten();
                return;
            case UrlShortingState.SHORTENED:
                setUrlData({url: "", state: UrlShortingState.INPUT});
                return;
        }

    }

    return (
        <div className={"flex flex-col w-full gap-4 items-center"}>
            <div className={"flex gap-2 w-full"}>
                <Input className="border-2 border-solid bg-gray-50 h-13" placeholder="Paste your url here"
                       value={urlData.url} onChange={handleUrlChange}
                       disabled={urlData.state === UrlShortingState.LOADING || urlData.state === UrlShortingState.SHORTENED}/>
                <Button onClick={()=>{
                    copyToClipboard(urlData.url);
                }} variant={"outline"} className={`h-13 ${urlData.state !== UrlShortingState.SHORTENED ? "hidden" : ""}`}>Copy</Button>
            </div>
            <Button className={`h-13 text-white w-1/2 hover:w-3/4 ${urlData.state === UrlShortingState.INPUT ? "bg-blue-700 hover:bg-blue-600" : "bg-gray-600 hover:bg-gray-700"}`} onClick={handleClick}
                    disabled={urlData.state === UrlShortingState.LOADING}>{urlData.state === UrlShortingState.LOADING ?
                <BeatLdr/> : urlData.state === UrlShortingState.SHORTENED ? "Another one" : "Shorten"}</Button>
        </div>
    );
}

export default SimpleShortner;