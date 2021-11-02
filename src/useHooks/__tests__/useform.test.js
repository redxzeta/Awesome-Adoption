import useForm from "../useForm";
import { renderHook, act } from "@testing-library/react-hooks";

test("testing useForm hook", () => {
  const initState = {
    id: 12,
    username: "bob",
    pet: "dog",
  };
  const { result } = renderHook(() => useForm(initState, () => {}));
  expect(result.current[0]).toBe(initState);
  act(() => {
    result.current[4]((s) => ({ ...s, pet: "cat" }));
  });
  expect(result.current[0].pet).toBe("cat");
  act(() => {
    result.current[4]((s) => ({ ...s, location: "house" }));
  });
  expect(result.current[0].location).toBe("house");
  act(() => {
    result.current[3]();
  });
  expect(result.current[0]).toBe(initState);
});
