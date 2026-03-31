import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useCheckAvailablityTimesOfProducts = () => {
  const { moment } = useContext(Context);

  const checkAvailablityTimesOfProducts = ({
    AvailableFromTime,
    AvailableToTime,
  }) => {
    // var format = "yyyy-MM-DD hh:mm a";
    const current_time_24 = moment(new Date()).format("HH:mm");
    // const current_time_24 = "01:00";

    var time = moment(current_time_24, "HH:mm"),
      beforeTime = moment(AvailableFromTime, "HH:mm"),
      afterTime = moment(AvailableToTime, "HH:mm");

    if (afterTime < beforeTime) {
      afterTime.add(1, "day");
      // time.add(1, "day");
    }

    beforeTime.format("yyyy-MM-DD HH:mm");
    afterTime.format("yyyy-MM-DD HH:mm");
    time.format("yyyy-MM-DD HH:mm");

    if (time.isSameOrAfter(beforeTime) && time.isSameOrBefore(afterTime)) {
      return true;
    } else {
      return false;
    }
  };

  return [checkAvailablityTimesOfProducts];
};
