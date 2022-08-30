import {
  StyledInputBase,
  StyledSearch,
  StyledSearchIconWrapper,
} from './Styled';
import SearchIcon from '@mui/icons-material/Search';

export function HeaderSearch() {
  return (
    <StyledSearch>
      <StyledSearchIconWrapper>
        <SearchIcon />
      </StyledSearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </StyledSearch>
  );
}
