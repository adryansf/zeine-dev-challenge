// Components
import { CustomButton } from "../custom-button";

// Types
interface Props {
  handleNext: () => void;
  handlePrevious: () => void;
  currentPage: number;
  totalPages: number;
}

// Component
export function Pagination({
  currentPage,
  totalPages,
  handleNext,
  handlePrevious,
}: Props) {
  return (
    <div className="block w-full mt-5">
      <div className="flex justify-center gap-5 w-full items-center">
        <CustomButton
          text=""
          size="small"
          variant="solid"
          leftIcon="arrow-left"
          onClick={handlePrevious}
          className="justify-center flex-0"
          disabled={currentPage === 1}
        />

        <p className="text-center">
          {currentPage} de {totalPages}
        </p>
        <CustomButton
          text=""
          size="small"
          variant="solid"
          rightIcon="arrow-right"
          onClick={handleNext}
          className="justify-center flex-0"
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
}
