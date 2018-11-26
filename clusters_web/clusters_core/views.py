from django.shortcuts import render

# Create your views here.
def add_meta(ctx, page_header=None, current_page=None):
    ctx.update(settings.SITE_SETTINGS)
    # banners = models.Banner.objects.filter(enabled=True).order_by('-id')
    # ctx.update({'banners': banners})
    ctx.update({
        'page_header': page_header,
        'current_page': current_page
    })

    return ctx

def index(request):
	context = {}
	context.update({'a': 1})	

	return render(request, 'c_index.html', context=context)