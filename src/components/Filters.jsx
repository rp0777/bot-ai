import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  filteredConversationsState,
  pastConversationsState,
} from "../store/atoms";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const ratingsArray = ["1 ⭐", "2 ⭐", "3 ⭐", "4 ⭐", "5 ⭐"];

const Filters = () => {
  const [ratings, setRatings] = React.useState([]);
  const setFilteredConversations = useSetRecoilState(
    filteredConversationsState
  );
  const pastConversations = useRecoilValue(pastConversationsState);

  const isRatedConversation = (conversation, starRating) => {
    const rated = conversation.filter(
      (chat) => chat.rating === parseInt(starRating)
    );

    if (rated.length > 0) {
      return rated;
    } else return;
  };

  React.useEffect(() => {
    if (ratings.length > 0) {
      let ratedConversations = [];
      ratings.map((starRating) =>
        pastConversations.map((conversation) => {
          const match = isRatedConversation(conversation, starRating[0]);

          if (match) {
            match.map((chat) => ratedConversations.push(chat));
          }

          return;
        })
      );

      ratedConversations.sort((a, b) => a.rating - b.rating);

      setFilteredConversations(ratedConversations);
    }

    if (ratings.length === 0) setFilteredConversations([]);
  }, [ratings]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setRatings(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className=" dark:text-white w-full font-semibold flex justify-center items-center gap-7">
      <h2>Filters</h2>

      {/* Ratings Filter */}
      <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel id="star-rating" className=" dark:text-white">
          Rating
        </InputLabel>
        <Select
          className=" dark:text-white"
          labelId="star-rating"
          id="star-rating"
          multiple
          value={ratings}
          onChange={handleChange}
          input={<OutlinedInput label="Rating" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {ratingsArray.map((stars) => (
            <MenuItem key={stars} value={stars}>
              <Checkbox checked={ratings.indexOf(stars) > -1} />
              <ListItemText primary={stars} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filters;
