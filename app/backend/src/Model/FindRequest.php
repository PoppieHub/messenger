<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class FindRequest
{
    #[NotBlank]
    #[Length(max: 128)]
    private string $searchValue;

    public function getSearchValue(): string
    {
        return $this->searchValue;
    }

    public function setSearchValue(string $searchValue): self
    {
        $this->searchValue = $searchValue;

        return $this;
    }
}