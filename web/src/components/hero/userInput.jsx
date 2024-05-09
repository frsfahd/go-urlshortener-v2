import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const UserInput = ({ host }) => {
    const [isCopied, setIscopied] = useState(false);
    const [formData, setFormData] = useState({});
    const [shortUrl, setShortUrl] = useState('');

    const inputRef = useRef();

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => {
                setIscopied(false);
            }, 3000); // Change this to the number of milliseconds you want to wait

            // Cleanup function to clear the timeout if the component is unmounted
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // console.log(formData.keyword);
            const res = await axios.post('/api/v1/shorten', formData);
            // console.log(res.data);
            setFormData({ long_url: '', keyword: '' });
            setShortUrl(res.data.short_url);
        } catch (error) {
            console.error(error);
        }
    };
    const copyHandler = () => {
        const text = inputRef.current.value;
        navigator.clipboard.writeText(text);
    };

    return (
        <form className="card-body" onSubmit={onSubmitHandler}>
            {/* long URL */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Paste a long URL</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg width="24" height="24" fill="currentColor" className="w-4 h-4 opacity-70" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8 8C5.75228 8 4 9.75228 4 12C4 14.2477 5.75228 16 8 16H10C10.5523 16 11 16.4477 11 17C11 17.5523 10.5523 18 10 18H8C4.64772 18 2 15.3523 2 12C2 8.64772 4.64772 6 8 6H10C10.5523 6 11 6.44772 11 7C11 7.55228 10.5523 8 10 8H8ZM13 7C13 6.44772 13.4477 6 14 6H16C19.3523 6 22 8.64772 22 12C22 15.3523 19.3523 18 16 18H14C13.4477 18 13 17.5523 13 17C13 16.4477 13.4477 16 14 16H16C18.2477 16 20 14.2477 20 12C20 9.75228 18.2477 8 16 8H14C13.4477 8 13 7.55228 13 7ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z"
                        />
                    </svg>
                    <input
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=Sfd8gcmg5Lo&list=RDSfd8gcmg5Lo&start_radio=1&ab_channel=HakushinChannel"
                        className="grow"
                        name="long_url"
                        onChange={onChangeHandler}
                        value={formData.long_url}
                        required
                    />
                </label>
            </div>
            {/* keyword */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Keyword (optional)</span>
                </label>
                <div className="join shrink">
                    <input type="text" value={`${host}/`} className="join-item w-1/3 input input-bordered" disabled />

                    <input
                        type="text"
                        placeholder="example: cool"
                        className="join-item w-2/3 input input-bordered"
                        name="keyword"
                        onChange={onChangeHandler}
                        value={formData.keyword}
                    />
                </div>
                {/* <label className="input input-bordered flex items-center gap-2">
                    <svg width="24" height="24" className="w-4 h-4 opacity-70" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="M394.6,341.2c-29.5,0-53.4,23.9-53.4,53.4s23.9,53.4,53.4,53.4c29.5,0,53.4-23.9,53.4-53.4S424.1,341.2,394.6,341.2z M394.6,432c-20.6,0-37.4-16.8-37.4-37.4c0-20.6,16.8-37.4,37.4-37.4s37.4,16.8,37.4,37.4C432,415.2,415.2,432,394.6,432z" />
                            <path d="M256,341.2c-29.5,0-53.4,23.9-53.4,53.4S226.5,448,256,448c29.5,0,53.4-23.9,53.4-53.4S285.5,341.2,256,341.2z M256,432 c-20.6,0-37.4-16.8-37.4-37.4c0-20.6,16.8-37.4,37.4-37.4s37.4,16.8,37.4,37.4C293.4,415.2,276.6,432,256,432z" />
                            <path d="M117.4,341.2c-29.5,0-53.4,23.9-53.4,53.4S87.9,448,117.4,448c29.5,0,53.4-23.9,53.4-53.4S146.9,341.2,117.4,341.2z M117.4,432C96.8,432,80,415.2,80,394.6c0-20.6,16.8-37.4,37.4-37.4s37.4,16.8,37.4,37.4C154.8,415.2,138.1,432,117.4,432z" />
                            <path d="M394.6,202.6c-29.5,0-53.4,23.9-53.4,53.4s23.9,53.4,53.4,53.4c29.5,0,53.4-23.9,53.4-53.4S424.1,202.6,394.6,202.6z M394.6,293.4c-20.6,0-37.4-16.8-37.4-37.4c0-20.6,16.8-37.4,37.4-37.4S432,235.4,432,256C432,276.6,415.2,293.4,394.6,293.4z" />
                            <path d="M256,202.6c-29.5,0-53.4,23.9-53.4,53.4s23.9,53.4,53.4,53.4c29.5,0,53.4-23.9,53.4-53.4S285.5,202.6,256,202.6z M256,293.4c-20.6,0-37.4-16.8-37.4-37.4c0-20.6,16.8-37.4,37.4-37.4s37.4,16.8,37.4,37.4C293.4,276.6,276.6,293.4,256,293.4z" />
                            <path d="M117.4,202.6C87.9,202.6,64,226.5,64,256s23.9,53.4,53.4,53.4c29.5,0,53.4-23.9,53.4-53.4S146.9,202.6,117.4,202.6z M117.4,293.4C96.8,293.4,80,276.6,80,256c0-20.6,16.8-37.4,37.4-37.4s37.4,16.8,37.4,37.4C154.8,276.6,138.1,293.4,117.4,293.4z" />
                            <path d="M394.6,170.8c29.5,0,53.4-23.9,53.4-53.4c0-29.5-23.9-53.4-53.4-53.4c-29.5,0-53.4,23.9-53.4,53.4 C341.2,146.9,365.1,170.8,394.6,170.8z M394.6,80c20.6,0,37.4,16.8,37.4,37.4c0,20.6-16.8,37.4-37.4,37.4s-37.4-16.8-37.4-37.4 C357.2,96.8,373.9,80,394.6,80z" />
                            <path d="M256,64c-29.5,0-53.4,23.9-53.4,53.4c0,29.5,23.9,53.4,53.4,53.4c29.5,0,53.4-23.9,53.4-53.4C309.4,87.9,285.5,64,256,64z M256,154.8c-20.6,0-37.4-16.8-37.4-37.4c0-20.6,16.8-37.4,37.4-37.4s37.4,16.8,37.4,37.4C293.4,138,276.6,154.8,256,154.8z" />
                            <path d="M117.4,64C87.9,64,64,87.9,64,117.4c0,29.5,23.9,53.4,53.4,53.4c29.5,0,53.4-23.9,53.4-53.4C170.8,87.9,146.9,64,117.4,64z M117.4,154.8C96.8,154.8,80,138,80,117.4C80,96.8,96.8,80,117.4,80s37.4,16.8,37.4,37.4C154.8,138,138.1,154.8,117.4,154.8z" />
                        </g>
                    </svg>
                </label> */}
            </div>
            {/* shorten button */}
            <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                    Shorten
                </button>
            </div>
            {/* short URL */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Your Short URL</span>
                </label>
                <div className="join">
                    {/* short URL */}
                    <input
                        type="text"
                        name="short-url"
                        id="short-url"
                        className="input input-bordered join-item grow disabled"
                        ref={inputRef}
                        value={shortUrl}
                        disabled
                    />
                    {/* copy button */}
                    <div className="tooltip" data-tip={isCopied ? 'copied' : 'copy'}>
                        <label onClick={copyHandler} className="btn join-item swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" checked={isCopied} onChange={() => setIscopied(!isCopied)} />

                            {/* copy icon */}
                            <svg width="24" height="24" fill="currentColor" className="swap-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    fill-rule="evenodd"
                                    d="M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 01-1.75 1.75H8.774a1.75 1.75 0 01-1.75-1.75V3.75zm1.75-.25a.25.25 0 00-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25H8.774z"
                                />
                                <path d="M1.995 10.749a1.75 1.75 0 011.75-1.751H5.25a.75.75 0 110 1.5H3.745a.25.25 0 00-.25.25L3.5 20.25c0 .138.111.25.25.25h9.5a.25.25 0 00.25-.25v-1.51a.75.75 0 111.5 0v1.51A1.75 1.75 0 0113.25 22h-9.5A1.75 1.75 0 012 20.25l-.005-9.501z" />
                            </svg>

                            {/* success icon */}
                            <svg width="24" height="24" fill="currentColor" className="swap-on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <g>
                                    <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26 S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" />
                                    <path d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406 l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411 C39.251,14.885,38.62,14.922,38.252,15.336z" />
                                </g>
                            </svg>
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default UserInput;
