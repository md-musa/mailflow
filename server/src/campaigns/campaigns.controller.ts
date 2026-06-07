import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('campaigns')
@UseGuards(AuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) { }

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto, @Request() req) {
    const userId = req.user.sub;
    console.log(createCampaignDto);
    return this.campaignsService.create(createCampaignDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.campaignsService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }
}
