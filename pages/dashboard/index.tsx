import cx from "./Dashboard.module.scss";
import Card from "../../components/ui/card";
import goals from "../goals/goals";
import { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-3xl font-semibold mt-5">GOALS</h1>
      <div className={cx.cards}>
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            semper viverra nulla, ac aliquam purus semper vel. Suspendisse a
            eros id tellus euismod condimentum malesuada a lectus. Pellentesque
            vel urna odio. Donec sagittis, enim non rhoncus convallis, ante
            magna auctor odio, eu tempus neque sapien quis risus. Integer at
            elit tristique, rhoncus lacus quis, semper augue. Donec placerat
            pretium dapibus. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Ut auctor accumsan
            placerat. Sed vulputate metus vitae turpis egestas semper. Aliquam
            ullamcorper euismod sem. Nullam diam justo, lacinia eget molestie
            eu, volutpat egestas nunc. Etiam dignissim ligula id auctor feugiat.
            Etiam quis lacus facilisis, dictum mi vitae, tincidunt leo. */}
        {goals.map((goals) => {
          return <Card key={goals.id} title={goals.title} desc={goals.desc} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
