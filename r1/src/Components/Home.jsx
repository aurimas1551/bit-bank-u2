import { useContext } from "react";
import { Global } from "./Global";

function Home() {
    const { list } = useContext(Global);
    return (
        <div className="home">
            <div className="home-summary">
                <h2>Bank U-3</h2>
                <div>Total amount of accounts: {list ? list.length : 0}</div>
                <div>
                    Total amount of money saved in the bank:{" "}
                    {list ? list.reduce((acc, bal) => acc + bal.sum, 0) : 0}
                </div>
                <div className="home-about">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ducimus sint recusandae facilis excepturi animi 
                    laboriosam voluptatem ab molestiae voluptate, eos pariatur id illo hic totam, quae consectetur quam exercitationem.</div>
            </div>
        </div>
    );
}

export default Home;
