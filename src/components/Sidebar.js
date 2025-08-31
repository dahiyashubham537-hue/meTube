import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showJoke } from "../utils/jokeSlice";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isSearchPage =
    new URLSearchParams(location.search).toString().length > 0;
  const dispatch = useDispatch();
  const getRandomJoke = async () => {
    const data = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
      //headers: { "X-Api-Key": "vJdMy+fRNourrOrq4/ABqw==rqltVziUwEy0GesO" },
      headers: { "X-Api-Key": process.env.REACT_APP_JOKE_API_KEY },
    });
    const json = await data.json();
    return json[0].joke;
  };
  const handleClick = async () => {
    const randomJoke = await getRandomJoke();
    dispatch(
      showJoke({
        joke: randomJoke,
        position: "left",
      })
    );
  };
  return (
    <div
      className={`flex flex-col ml-6 gap-6 text-xs mt-3 cursor-pointer ${
        isSearchPage ? "mr-4" : ""
      }`}
    >
      <Link to={"/"}>
        <div className="flex flex-col justify-center items-center ">
          <img
            className="w-10 -mb-2"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAACOjo77+/sEBARYWFjBwcH5+fnv7+/ExMTJycnb29szMzPy8vI2Njbo6Ojh4eGmpqY9PT0hISGEhIRhYWGsrKx9fX0XFxdDQ0Obm5vR0dFwcHANDQ1TU1MbGxsmJiZnZ2eTk5O0tLTpJx6UAAAEcklEQVR4nO2c6XaqMBRGkwYEpRZRQYul1fb93/HmBAf0hsGBhLC+/UNtWWD2yjkkZJAxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4imBCCHovX20X5+VIIxGUkvQ+QkPlFCdf/lcSj9OPmC05sZzZLkgfyNhkf6Tn0Uum/h4XgoUbfmETjs1QsCg91l9Zj2k0KkXpMvu4CKpPH7NR3W9EVvAbQ15kIxEkjXk1BSvJOKfm33YBn0WwgEW+VpBzP5JHR6A4e68G6AX5v/eZ+4KMZVvu6QQ5/Xub2S7eU1RSsKYOj8noakVSsaPvmhS88B0xVxVlqSdLffVdVeRy4qqhbAV/pEFNEp5T0eM/rraMwbp0aDZUR9eB7cLeCz3nxp+8aE3CkoJ/LtwL1Ol7c3zexOrH1CXFQIgg2bfdY64UOV8lsnvjRrCqVnBdFruTpFfWYtkyOoFMwe+Octeafmy76O1Q/QWUgo9x7KYOPSFFsnpQ0JPJOHQ7elja8Hsj9GxIyTj4x6k4bWvkmwxpAGewySjUw+x0/5Bblf30eK2hoQZA858HA7RSkfwnZ4McTpX9tHDNu/djag3lBdbhMMdvFodHbzG3tcgPC9sy/yFUR5QK93yUqgGc6aCaRdVK510fJLpR5ENq++WzEnVEXxGhJygZ52JAyUgp+PxNpiJIlxpSMs7e20YrHlD0qJs6ACiS8tdG6NmS85zZjdTyu8t5wdcrqituwso3WXKkecHXRuhZkS6aRrbvqKd5wX7q8DjPaAvKkKxSnD4UiczaHNzN1Hx/WJn0V33/RWpEUCbjwsbThlCrY/qIzls8tQLHeC0KNimomTdi6PFiYlpRsMWj402PsVoYv9vkRgWpe2MYcTBseDAdpUHd+oq+8E1HafBl2PDL8KyNkL2ZFz8w1aMepTLjN9PQ5wZbC+6H5rs10bJShr7cTiwj4340h7Z+foC7G/t1bOkRSsxDyatHoU6o0Sj1BdYHpN56M3yzrXYEhjB0wrAnYGgKGMIQhvaBIQxhaB8YwhCG9oEhDGFon7sM7xrvcMzQO63/9jovBHfMULHa3zN37JSh2hST7OIw3iU+7xitrhgeZdLL7EqUXh1x35DSzkvm59kVweaJ12VfhlOGWXUdpfycjcmwHL2uLmqiz11Gyp0x5Pzzv3UGQny2n+aQ4Z/mtL8xGS5120Pny9bz3DHcaM9rX7vpjqF+yVb7wjF3DCfa8yYwhKExYAhDGNoHhjCEoX1gCEMY2geGMBy+4W/L5hmPT7XnTRsHTGkjya9hEz1CGjaP7T5mSAd/B/LbH3+8aC7rVr/jJdo2C3raYVYbxG1TgulcUxeCzRt3StMvDQ7mtz8afxhDHtlpg02wXdN5BR9IGirypnhb6bOQmDbV/tb4xth6ArF7S309h7x+V5ZgcX6oOS9909e8HdTEUiA0nDZ+6jaAno/VnTgcwaYfPBBXb10PsdZDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwxT9TgDtlIjVoIwAAAABJRU5ErkJggg=="
          />
          Home
        </div>
      </Link>
      <div
        onClick={handleClick}
        className=" flex flex-col justify-center items-center"
      >
        <img
          className="w-8 -mb-1"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8DAwMAAAD8/PwGBgZ/f3/MzMz39/fv7+/IyMj09PTT09PExMTr6+t7e3t4eHiioqK3t7dNTU3Z2dkvLy/k5OQ9PT2cnJympqaKioqtra1vb2++vr6EhISPj49bW1sZGRlFRUVmZmYlJSU1NTVeXl5JSUk5OTkeHh5BQUFTU1MRERGVlZXJvYSeAAALJklEQVR4nO1d63aiMBDGBNSKiqiI4nW1trX1/Z9vCSaYhDskAT35fvR0VwsZJpn7DIahoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaHxWhh+rPfn3/nv8XwI7FHbqxEJiH7YmyVgMPc98tkbYOSfEFG9JyIib27bCxMAxKPRgaWOovIUvDwboTHw0+nDRC4/2l5iUwQ59PV6pgmA0/YSG8E98fQlCAbg4r3sVh1/A2By0iUG/f/9tldaAyFP+l8sGQCc1/3JYDAYeWP/GP7TNE3y2e4Fubg4cvRdx8znA/ffk8EAjF+NQu/Mab+zl/ySPY9pBGChfpENMJxy9B0z1u8+STRfyIwbbDj6bhmCBEJjuCJfBXO1q6yJ8CxBRsGH6m45zv2TLeaiCdaKFtkQa04P/OSbniEbHUC+O1S0xroIF2u4F3SwMFNC/hXyBQnQI+Zi142bcK3jT05B+KU0wOD0IBGAFHnbJdhIv5kUfZtBqb+Dhv14MGaHmQh5BR8SOJ2U/3sL4D/qrsbwthz/tpX89yF+Op0Vp6MpJ0B/qxooB0zhTcr6mmJw4BTgP7vyNYZkm3ZQYSAPvtejNug3chNgVTP6F5PYrcANoiL4Y/l3qrnEAFO4F7rC5nB/aA83/B1JilpekNe1gxjtwo/vWgo+HY9Lgb+ueInhOmzGgw836KaRMnscxA6JGqTgAc2/6bBZHGKLt2lHDLfJlqLPDAncVjBg0kHMmk64+kOLi6BlefBVsMEUVtelYgEfHjyI2Reev7mQRVnY+F60HZFKevCCgvJdOYcoRE8rwIswG2SOZWnjA10f2IOnz99fIG5HYX1otrlHUxW8qAURm+Zb0PVqwOZD9BuhT5vYpVORF62CxZWjzxJse8wxhYHYy5YF8uBjBwmF0LaiJd6E+IfqRWm4FUcW58GLUPAcDjjathR+5RK4cx7ufCE8EQZHJE7ji71wiVsbiwur4FdSsu4WCXur14azFAUvXmPZhIVn4Zcuwpb1kCQJOngiLFTtWMA5Q5+0M/JLCFTOwi9A0XcYhdtTiknlYE2kXlVcYx9JvIKn8Mwf3hU7Tvs4OQu+5NW7DFckGwBWcu6QAWiMQcxAWQcQRnn8+DaKNQXRwSEH5dWdoVqM+KirLhraxsdfvAmD4V3pehpX8SG040MoJTIEH+E6ylZSnq/AisIMlbyURzvcs/nGner4ky1RB8NkPu6iPkh6lZrOm3He2FZ9bGZIWDiTcPHAfLrTKFx+aaPyck1YKNoPNIzdkg/XtVJ2SYImgs0oaHzcuIKGKFynnsIBcddKWRnQK79IWr6EBB7KFdyIRx9UMhTBfliW14D2VqbtpQpnmMJDua+Hi72XZAZ4WvPnNqvXcbEgyK+ajBGVpZezzmNj99pmmhDGlR8ljX1kXZYMcZADfmu5/eAbp4EqbT0AlsWFNE+HZeUKTHpUxuWx5FM18REq8luRo0VLmt6+tVQh/HlQWDb+TCgk4eLirxJp+otOehuMxDy8VFdyqKsi74ixDUEo2zprZad+1jmHz2U72RJqA9gvozKqNrJN2DksW86aWDTYj7LYOAj+MXnyqFdhodxwO1cr/Eg03yETIHvJCwfwXFdeN3uvlq1MaS9ERfrZNA7WS95DVCxwdtXyJBkNsKe8B9Q/s17+XO02nRAdXu62GS2i2c0y0WWH/rMy1VRedXmpVLCb2QQLwHc/b/uNV5QFMFe6T0mNWTn3KafNN1TqueJqdyEhbxOdRXVYEPOxX+bB5jUyEzcp6zLQAj2St1ir5OKlChNzKYx6L/KcFKoD0VNIYkAF2wrvmk+hiU2ATNixw6FS2kCTRNtKFEPmU4j5eM+msR+TqM6AgySQYYK/YuO0mELExxzl6hIKlZaxEyEHVoMiLhZSaBa1CcXFJiqFTT/2a1eZZjRGAYWoTShXLYafEcn2I5aIPEBjGidnfwoyiEWy9HNXeLsxeZwqp4DA5TPyl2/751EIwF8pw4g4bErrTSZUiv0zL3uSN5qlnGOEqgZwxlmpBW5TViP4t8vMMKRTGPU5l40UG0YPM1HtsJo+tfZwux0yTJMMCgHYVAjbE1P4LmbpZWGzfiq4os2a4GMKhWaRrZYAyZX8Clt8OUyW9OrRWKd10jZJUgjSB33kAWKf9CRm4WXvCg3oJAKADu8PpcRpkM9UMbq0wl63+oTU+JSgcRUwdk4i1pY16CMXJPzVQiB8cGdjY5GzQPOR68NfFiv4NFiYh610dg38H/AcdxEthOYSI3Hr9gHHwrSNugW0IcdHNv6XSmH4S/0g/aFFCh/w6Ih8GoVYwdclkXRYttl/CIPnPKAEhQWOfDFalDQ04mE5HIUgysc0yj60py0ouJd0HmZM8qoEovH/Gl6nCejmPI6HBXnRMiBW21fjK9WFfaObgxgKH65VQ7eHKItNs8vUBjtex5Sgl/+qVbgIRmJ+3pGNMQrwWj+IB6y6DgwVj4zojKZZb/xM0W3iWsGj6EuXQMAlM1HzmvBQwwfRQvVs2tpA3ZW/bHPeRc4SlsQsknL1bEBjYTL0yQm7w1CQ4vST4hgGCmMypTKhWS2laIK05yA5ozDWhiqW6TS0vHLXRZyZkVFWnocxoOqV9w3Hz2TjSeBScQWYx5W7SsLHM/CstOYUPltXo94uaQ/38HyOasUMDP01knyej6TV89jfT2P+KucWmYjFKDhL4x89igLcFJe24RrThx0l594TehQFuKg1SKHhk4TetwT60BWH9CiKKA2rFjCOLk2kUDhiYrAAXJWqeoR1JGbMqO5LAoU+Z8376luDHgEZU86I7ah5jbJ2ly30Xthkj0oIXu4u7KiNdsbOkqCJUBZGExnockSzxeYu4q6JdgapNwU8rd02ULGCtiy8Iz9NubXo71h06QcSlN6WrXuWac0XgnTnCfTokYLv0fuzRpZYIEh3njBJCqnudLOwPkcByDhYQZZUQsEvW3+pzA1TKEaQM9Oii18HoQS476lsd14uXK47XXksJhUPdSiiFPLjkzNgcrqFVAL3kDYbtAkfr4NgBGizLLFAfAk5h8iDZzZoTteeaohIqdPjZ3qSw3XVcWhsliYVfCeGWGNAw8XJvLpT/EcbbtrwraDOWzm8+qM2a7zvqRWQfpI6WwspeEZBdEDBJ0Fma1uV9hb6LvNCxzLve2oJpIm0kmWa9r6nu6R8XHM8NpoJDlWYSM+Xi+jbyEsHNIZV7SVaiE+LX46+Din4FHhYWpSORbHveyIKvqsMRNiSqH7hqCj08YR+oaNZ2BvbCeD0qFmm23nEvNARTVN+iTfD3gmFRbZb0oPvoIJPxTIeDZs5OhF1K1R8oWN3AI0FoTBvmr+bCNF3VgGmIIh5kzb4D3IK3iR13q+EDdW6liIc+ytewStPAjaGE+9ANANqTWtwz19SOWpEYIvz5RpgC+hXBoDl1nfHH+PAP18ApwA75cGXB6SqXTCR8XvRGQNGwusSlGHHjjxKAndqvyygMWEM6gQA+HwVBZ8N12SMapa+2o1cHUJ4vtYmP4TssT3BT0vvvREMJEJ2x4d8YWTOdWe8roBJYug6n5Qs/XTcl9R/BRgsxsFstg7GixezzjQ0NDQ0NDQ0NDQ0NDQ0NDQ05AEOY7S9FElYbx1nGyL8+cpZhRzMppbjep5rWY7aeZnKMJs6C3uz6bvTt6XQCRabyeTuvC8PHe/u3TeT96Zw8uYUuv5kNNxM35fCqWUNrY39xpJmak3dvbd7Z21hWeEOnb4xhZaFSLTemcLpYT1bz+7vew6ttT/zg7u/tt6UQt8JN+ge7dPtm1I4sWPonPtb4D9ZuHLKUgFcrgAAAABJRU5ErkJggg=="
        />
        Shorts
      </div>
      <div
        onClick={handleClick}
        className="flex flex-col justify-center items-center"
      >
        <img
          className="w-6 mb-1 "
          src="data:image/png;base64,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"
        />
        Subscriptions
      </div>
      <div
        onClick={handleClick}
        className="flex flex-col justify-center items-center"
      >
        <img
          className="w-8 "
          src="https://tse4.mm.bing.net/th/id/OIP.Ln_qrnMeEWlR-sIzaHn2fAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
        />
        You
      </div>
      <div
        onClick={handleClick}
        className="flex flex-col justify-center items-center"
      >
        <img
          className="w-6 mb-1 "
          src="data:image/png;base64,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"
        />
        History
      </div>
    </div>
  );
};

export default Sidebar;
