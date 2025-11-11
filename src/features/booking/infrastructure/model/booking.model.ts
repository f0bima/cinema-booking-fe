export type TBookingModel = {
  booking: {
    id: number;
    booking_code: string;
    user_id: number;
    user_name: string;
    user_email: string;
    studio_id: number;
    seat_ids: number[];
    qr_code: string;
    booking_type: "online" | "offline";
    status: "active" | "used";
    created_at: Date;
    updated_at: Date;
  };
  qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAADYElEQVR42uyZMW7zOhCEh1DBkjcwL2KI13JhQAJU6FoydBHqBluyEDQPu0wcp3vFb5lFWASS8wWgSe7MLIO/8Tf+9UgkV5JjynJLGZweWdBtJI9mgB7wiyMnZviVLHdAPDexX50ERM6LkzIskGG/6CR1xptwbwtYNyn3pN8iB8BluV3dBwDuCpBS7j0EaAwA/HqgDEuUYXHiJxL68Hoe3gzYsdeV7GOYXx5+18WHAR1dBjpmO3vcHcUz/xKRNwM9wswDpaPtZi3S2zWSY98OEFnSga91c9Sf5JpDwWlAIgZu5J4YqJu499FWsnRLM4DLHNMBnTNnXc0x6b5H8dNxFgAErvo5YtAl9TrbeblAhaIVIBG3TksSUa0RHPto3oQ7zgJc5rxHexWvc6vSSvOgZgDKDVGsLvQjtUXAlrQ/C1DZtNmkzAI98QdY0ouItQCApTtCAaIgbcRdZW13LOcBuolqi6YGV4QCx6B/wmdtfh5ImWO3sdydqpnWhSO5RCnDaQAAzyP4XYWCG9Fp2MOrgHweSGRJpB9Vcjuqd2fxu4YcnAXouulJnw7IQFrqU314ZpgmgBzGbpPaX2jIGRM5dhnf3n0GwJqKp4dZs2jiCjM34Yh2AKsL3WBLg9QHuem3+LGDdwO9nnZdN0QM1LOnnWnHF5X7PKACcq0iD+ACPzGHURPplyWdATBwj8IdkTM1tZNhXo/wvZItAIi4Xeu+147s3kcMS+R3Ij0BcDlwvwDdoW4DFOuaUV9aAawR20xXaZZtiWvHqx28H9DXYGrPtQYJ1GawHUAjlWab4ZFZuqpmut1STgQYaJcJjgb4iQxjyoHT0gxgdeFM22VgDmpJcrtG+VWb7wVSJvdLKEhfGX5PasvbTxPUBqDZpgxL1AUE7hZyLppKzwJctiBauiOK3YXuKdsV6E9b3QBA0dqozbImLn4lUj/2ZwGJJvI0o9GwNz00eqk1twNUpa2xmcuX0g6rJYqzALtdzMDwoAx2F6Rd6brJ80w2ANjN/yX46cGaBp+x+d6fBkRqYtGzF3RLcU8qpD+72QqwOCnVuxHMxMvVPUXsNIClY+0B/egIvyB4Lu0A9X9Jno8MU/vpobH0eNriCUA99kEli/OuGZ4qrRT8qovPAn/jb/z/8V8AAAD//1z0qxYjiMNJAAAAAElFTkSuQmCC";
};
