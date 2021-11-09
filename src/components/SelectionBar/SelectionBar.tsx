import React from 'react';
import {
  CheckCircle,
  DownloadSimple,
  PlusCircle,
  ProhibitInset,
} from 'phosphor-react';
import styled from 'styled-components';
import 'styled-components/macro';
import { CSSTransition } from 'react-transition-group';
import { CrateItem } from '../../types';
import useMutateTracks from '../../hooks/useMutateTracks';

interface SelectionBarProps {
  selection: CrateItem[];
  clearSelection(): void;
}

const StyledCSSTransition = styled(CSSTransition)`
  opacity: 0;
  transform: scale(0.975, 0.95);
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 3;

  &.transition-enter-active,
  &.transition-enter-done {
    transform: scale(1);
    opacity: 1;
  }
`;

const StyledLink = styled.a`
  margin-right: 4px;
  display: flex;
  align-items: center;
  padding-left: 12px !important;
  padding-right: 12px !important;
  cursor: default;

  svg {
    margin-left: 8px;
  }

  &:hover {
    background: var(--green-9);
  }
`;

const StyledWrapper = styled.div`
  background: var(--green-8);
  border-radius: var(--radius-sm);
  display: flex;
  font-size: 0.875rem;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 16px;
  position: absolute;
  top: 8px;
  left: 0;
  width: 100%;

  ${StyledLink} {
    color: white;
    color: var(--green-1);
    padding: 12px 0;
  }
`;

const SelectionBar = ({ selection, clearSelection }: SelectionBarProps) => {
  const { mutateStatus } = useMutateTracks();

  return (
    <StyledCSSTransition
      in={selection.length > 1}
      timeout={200}
      classNames="transition"
      unmountOnExit={true}
    >
      <StyledWrapper>
        <div
          css={`
            align-items: center;
            display: flex;
          `}
        >
          <span
            css={`
              margin-right: 12px;
              width: 130px;
            `}
          >
            {selection.length} items selected:
          </span>
          <StyledLink onClick={() => mutateStatus('queue', selection)}>
            Add to queue
            <PlusCircle weight="fill" size={20} />
          </StyledLink>
          <StyledLink onClick={() => mutateStatus('reviewed', selection)}>
            Mark as reviewed
            <CheckCircle weight="fill" size={20} />
          </StyledLink>
          <StyledLink onClick={() => mutateStatus('downloaded', selection)}>
            Mark as downloaded
            <DownloadSimple size={20} />
          </StyledLink>
          <StyledLink onClick={() => mutateStatus('reset', selection)}>
            Reset status
            <ProhibitInset size={20} />
          </StyledLink>
        </div>
        <StyledLink
          onClick={clearSelection}
          css={`
            margin-right: -16px;
          `}
        >
          Cancel
        </StyledLink>
      </StyledWrapper>
    </StyledCSSTransition>
  );
};

export default SelectionBar;
