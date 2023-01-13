import React , {FC} from "react";
import { IHeader } from "../structure";

const Header: FC<IHeader> = ({ chance,score }: IHeader) => {
  return (
    <div className="question bg-white p-3 border-bottom">
      <div className="d-flex flex-row mcq justify-content-between">
        <h4>Welcome to Sauce Labs Test</h4>
        <span>
          Chance Left : {chance} | Current Score : {score}
        </span>
      </div>
    </div>
  );
}
export default Header;
