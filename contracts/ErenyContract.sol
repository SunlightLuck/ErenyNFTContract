pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ErenyToken is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(string => uint8) private _exisitingURIs;
    mapping(uint256 => bool) private _isCommodity;
    mapping(uint256 => uint256) private _tokenPrice;

    constructor() ERC721("ErenyToken", "ET") {}

    event Mint(address indexed receipient, uint256 indexed tokenId);
    event Buy(
        address indexed seller,
        address indexed buyer,
        uint256 indexed tokenId
    );
    event Commoditize(uint256 indexed tokenId);

    function count() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function isCommodity(uint256 tokenId) external view returns (bool) {
        return _isCommodity[tokenId];
    }

    function getTokenPrice(uint256 tokenId) external view returns (uint256) {
        require(_isCommodity[tokenId], "Token is not commodity");
        return _tokenPrice[tokenId];
    }

    function mint(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit Mint(recipient, tokenId);
        return tokenId;
    }

    function buy(address recipient, uint256 tokenId) public payable {
        require(_isCommodity[tokenId], "Token is not commodity");

        address tokenOwner = ownerOf(tokenId);
        _transfer(tokenOwner, recipient, tokenId);
        payable(tokenOwner).transfer(msg.value);
        _isCommodity[tokenId] = false;

        emit Buy(tokenOwner, recipient, tokenId);
    }

    function setToCommodity(
        address owner,
        uint256 tokenId,
        uint256 price
    ) public {
        require(ownerOf(tokenId) == owner, "Token is not yours");
        _isCommodity[tokenId] = true;
        _tokenPrice[tokenId] = price;

        emit Commoditize(tokenId);
    }

    function isContentOwned(string memory tokenURI) public view returns (bool) {
        return _exisitingURIs[tokenURI] == 1;
    }
}
